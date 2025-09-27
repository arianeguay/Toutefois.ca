<#  =======================================================================
Facebook Page Posts → PowerShell OAuth + Fetch
---------------------------------------------------------------------------
What it does
  1) Opens the Facebook Login dialog (with proper scopes)
  2) Catches the ?code=... on http://localhost:{port}/callback
  3) Exchanges code → short-lived user token
  4) Exchanges short → long-lived user token
  5) Gets your Page access token via /me/accounts (or picks the one for $PageId)
  6) Fetches /{PAGE_ID}/posts and saves fb_posts.json

Usage
  - Edit the CONFIG section (AppId, AppSecret, RedirectPort, optional PageId)
  - Run in PowerShell:  .\fb-fetch.ps1
  - If you get an HTTP listener/ACL error, run PowerShell as Admin once,
    or let the script auto-register the URL ACL.

Security
  - Tokens are written to fb_tokens.json (you can change the path or encrypt).
======================================================================= #>

# --------------------- CONFIG ---------------------
$AppId         = "1092018233102931"
$AppSecret     = "84d52316e24ce23c38443408261fe648"
$RedirectPort  = 53682           # change if in use
$PageId        = ""              # optional. leave empty to choose interactively

# Scopes needed to read posts
$Scopes = @("pages_read_engagement","pages_read_user_content","pages_show_list")

# Output files
$TokenFile = Join-Path $PSScriptRoot "fb_tokens.json"
$PostsFile = Join-Path $PSScriptRoot "fb_posts.json"

# Graph version
$GraphV = "v19.0"  # current as of 2025-09; bump if needed

# ------------------ Helper functions --------------
function UrlEncode([string]$s){
  [System.Net.WebUtility]::UrlEncode($s)
}

function Invoke-GraphGet {
  param(
    [Parameter(Mandatory)][string]$Path,
    [Hashtable]$Query
  )
  $qs = if ($Query) {
    ($Query.GetEnumerator() | ForEach-Object { "$(UrlEncode($_.Key))=$(UrlEncode([string]$_.Value))" }) -join "&"
  }
  $url = "https://graph.facebook.com/$GraphV/$Path" + ($(if($qs){"?$qs"}))
  try {
    Invoke-RestMethod -Method GET -Uri $url -TimeoutSec 60
  } catch {
    Write-Host "`nGraph GET error:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message -ForegroundColor DarkRed }
    throw
  }
}

function Save-Json($obj, $path){
  $obj | ConvertTo-Json -Depth 10 | Set-Content -Encoding UTF8 $path
  Write-Host "Saved → $path" -ForegroundColor Green
}

# Try to ensure HttpListener URL ACL exists (requires admin once).
function Ensure-UrlAcl {
  param([string]$Url)
  try {
    $listener = [System.Net.HttpListener]::new()
    $listener.Prefixes.Add($Url)
    $listener.Start()
    $listener.Stop()
    $listener.Close()
    return $true
  } catch {
    Write-Host "HttpListener couldn't bind to $Url. Attempting URL ACL registration..." -ForegroundColor Yellow
    try {
      $user = "$env:USERDOMAIN\$env:USERNAME"
      Start-Process -FilePath "netsh" -ArgumentList @("http","add","urlacl","url=$Url","user=$user") -Verb RunAs -Wait
      return $true
    } catch {
      Write-Host "Failed to register URL ACL automatically. Try running PowerShell as Admin OR choose another port." -ForegroundColor Red
      return $false
    }
  }
}

# --------------- 1) Start local callback -----------
$RedirectUri = "http://localhost:$RedirectPort/callback/"
$prefix = "http://localhost:$RedirectPort/"
if (-not (Ensure-UrlAcl -Url $prefix)) { throw "Cannot bind to $prefix. Run elevated once, or change port." }

$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add($prefix)
$http.Start()
Write-Host "Listening on $prefix ..." -ForegroundColor Cyan

# --------------- 2) Open FB Login -----------------
$authUrl = "https://www.facebook.com/$GraphV/dialog/oauth" +
  "?client_id=$($AppId)" +
  "&redirect_uri=$(UrlEncode($RedirectUri))" +
  "&response_type=code" +
  "&scope=$(UrlEncode(($Scopes -join ',')))" +
  "&state=$(UrlEncode([Guid]::NewGuid().ToString()))"

Start-Process $authUrl
Write-Host "A browser window was opened. Log in and approve permissions..." -ForegroundColor Cyan

# --------------- 3) Capture ?code= ----------------
$ctx = $http.GetContext()           # wait for first request
$req = $ctx.Request
$resp = $ctx.Response

if ($req.Url.AbsolutePath -notlike "/callback*") {
  $resp.StatusCode = 404
  $resp.OutputStream.Close()
  $http.Stop()
  throw "Unexpected path: $($req.Url.AbsolutePath)"
}

$code = $req.QueryString["code"]
$error = $null
if ($req.QueryString["error"]) {
    $error = $req.QueryString["error"]
} elseif ($req.QueryString["error_reason"]) {
    $error = $req.QueryString["error_reason"]
}

if ($error) {
  $resp.StatusCode = 400
  [Text.Encoding]::UTF8.GetBytes("OAuth error: $error") | % { $resp.OutputStream.WriteByte($_) }
  $resp.OutputStream.Close()
  $http.Stop()
  throw "OAuth error: $error"
}

if (-not $code) {
  $resp.StatusCode = 400
  [Text.Encoding]::UTF8.GetBytes("Missing 'code' in callback.") | % { $resp.OutputStream.WriteByte($_) }
  $resp.OutputStream.Close()
  $http.Stop()
  throw "Missing 'code' in callback."
}

# Friendly page to close the tab
$page = "<html><body style='font-family:system-ui;padding:24px'>
<h2>Facebook authorization complete ✅</h2>
<p>You can close this tab and return to PowerShell.</p></body></html>"
$bytes = [Text.Encoding]::UTF8.GetBytes($page)
$resp.ContentType = "text/html; charset=utf-8"
$resp.OutputStream.Write($bytes, 0, $bytes.Length)
$resp.OutputStream.Close()
$http.Stop()

Write-Host "Got authorization code." -ForegroundColor Green

# -------- 4) code → short-lived user token --------
$tokenRes = Invoke-GraphGet -Path "oauth/access_token" -Query @{
  client_id     = $AppId
  redirect_uri  = $RedirectUri
  client_secret = $AppSecret
  code          = $code
}
$shortUserToken = $tokenRes.access_token
if (-not $shortUserToken) { throw "Failed to retrieve short-lived user token." }
Write-Host "Short-lived user token acquired." -ForegroundColor Green

# ------- 5) short → long-lived user token ---------
$longRes = Invoke-GraphGet -Path "oauth/access_token" -Query @{
  grant_type     = "fb_exchange_token"
  client_id      = $AppId
  client_secret  = $AppSecret
  fb_exchange_token = $shortUserToken
}
$longUserToken = $longRes.access_token
if (-not $longUserToken) { throw "Failed to retrieve long-lived user token." }
Write-Host "Long-lived user token acquired." -ForegroundColor Green

# -------- 6) Get Page access token(s) -------------
$accounts = Invoke-GraphGet -Path "me/accounts" -Query @{ access_token = $longUserToken; limit = 100 }
if (-not $accounts.data) { throw "No managed Pages returned. Is your FB user an admin/editor of the Page?" }

# Optionally pick a specific Page ID
if ([string]::IsNullOrWhiteSpace($PageId)) {
  Write-Host "`nChoose a Page:" -ForegroundColor Cyan
  $i = 0
  $accounts.data | ForEach-Object {
    "{0,2}. {1}  ({2})" -f $i, $_.name, $_.id | Write-Host
    $i++
  }
  $sel = Read-Host "Enter index"
  $sel = [int]$sel
  $page = $accounts.data[$sel]
} else {
  $page = $accounts.data | Where-Object { $_.id -eq $PageId } | Select-Object -First 1
  if (-not $page) { throw "PageId $PageId not found in /me/accounts list." }
}

$PageIdChosen = $page.id
$PageToken    = $page.access_token
Write-Host "Selected Page: $($page.name) ($PageIdChosen)" -ForegroundColor Green

# -------- 7) Save tokens (optional) ---------------
$tokObj = [ordered]@{
  acquired_at       = (Get-Date).ToString("s")
  graph_version     = $GraphV
  app_id            = $AppId
  redirect_uri      = $RedirectUri
  long_user_token   = $longUserToken
  page_id           = $PageIdChosen
  page_access_token = $PageToken
}
Save-Json $tokObj $TokenFile

# -------- 8) Fetch posts and save -----------------
# Adjust fields as needed. Example includes message, time, permalink, and attachments.
$fields = "message,created_time,permalink_url,attachments{media_type,media,url,subattachments}"
$posts = Invoke-GraphGet -Path "$PageIdChosen/posts" -Query @{
  access_token = $PageToken
  fields       = $fields
  limit        = 25
}

Save-Json $posts $PostsFile
Write-Host "`nDone. Posts saved to $PostsFile" -ForegroundColor Green
