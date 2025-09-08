# PowerShell script to migrate from the current setup to Next.js
# This script renames all the .next.* files to their actual names

Write-Host "Starting Next.js migration process..." -ForegroundColor Cyan

# Update package.json
Write-Host "Updating package.json..." -ForegroundColor Yellow
if (Test-Path "package.json.next") {
    Move-Item -Path "package.json" -Destination "package.json.old" -Force
    Move-Item -Path "package.json.next" -Destination "package.json" -Force
    Write-Host "✅ package.json updated" -ForegroundColor Green
}

# Update tsconfig.json
Write-Host "Updating tsconfig.json..." -ForegroundColor Yellow
if (Test-Path "tsconfig.next.json") {
    Move-Item -Path "tsconfig.json" -Destination "tsconfig.json.old" -Force
    Move-Item -Path "tsconfig.next.json" -Destination "tsconfig.json" -Force
    Write-Host "✅ tsconfig.json updated" -ForegroundColor Green
}

# Update components
Write-Host "Updating components..." -ForegroundColor Yellow

# Function to update component files
function Update-NextComponents {
    param (
        [string]$basePath
    )

    $nextFiles = Get-ChildItem -Path $basePath -Filter "*.next.*" -Recurse
    foreach ($file in $nextFiles) {
        $targetName = $file.FullName -replace "\.next\.", "."
        if (Test-Path $targetName) {
            Write-Host "Backing up $targetName" -ForegroundColor Gray
            Move-Item -Path $targetName -Destination "$targetName.old" -Force
        }
        Write-Host "Moving $($file.FullName) to $targetName" -ForegroundColor Gray
        Move-Item -Path $file.FullName -Destination $targetName -Force
        Write-Host "✅ $($file.Name) migrated" -ForegroundColor Green
    }
}

# Update components in various directories
Update-NextComponents -basePath "src\components"
Update-NextComponents -basePath "src\layout"
Update-NextComponents -basePath "src\api"

Write-Host "Migration complete! 🚀" -ForegroundColor Cyan
Write-Host "Run 'yarn dev' to start the Next.js development server" -ForegroundColor Cyan
