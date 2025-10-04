<?php
if (!defined('ABSPATH')) { exit; }

/**
 * Collect all image URLs from a Facebook post payload (full_picture, attachment media, subattachments)
 * @param array $fb
 * @return string[]
 */
function toutefois_fb_collect_image_urls($fb) {
    $urls = array();
    if (!empty($fb['full_picture']) && is_string($fb['full_picture'])) {
        $urls[] = $fb['full_picture'];
    }
    if (!empty($fb['attachments']['data']) && is_array($fb['attachments']['data'])) {
        foreach ($fb['attachments']['data'] as $att) {
            if (!empty($att['media']['image']['src'])) {
                $urls[] = $att['media']['image']['src'];
            }
            if (!empty($att['subattachments']['data']) && is_array($att['subattachments']['data'])) {
                foreach ($att['subattachments']['data'] as $sub) {
                    if (!empty($sub['media']['image']['src'])) {
                        $urls[] = $sub['media']['image']['src'];
                    }
                }
            }
        }
    }
    // De-duplicate
    $urls = array_values(array_unique(array_map('strval', $urls)));
    return $urls;
}

function toutefois_fb_fetch_url($url) {
    $response = wp_remote_get($url, array('timeout' => 25));
    if (is_wp_error($response)) return array('data' => array());
    $code = wp_remote_retrieve_response_code($response);
    if ($code < 200 || $code >= 300) return array('data' => array());
    $data = json_decode(wp_remote_retrieve_body($response), true);
    return is_array($data) ? $data : array('data' => array());
}

// Option keys
const TF_FB_ACCESS_TOKEN = 'toutefois_fb_access_token';
const TF_FB_PAGE_ID = 'toutefois_fb_page_id';
const TF_FB_EXCLUDE_EVENTS = 'toutefois_fb_exclude_events';
const TF_FB_EXCLUDE_REELS = 'toutefois_fb_exclude_reels';
const TF_FB_REQUIRE_IMAGE = 'toutefois_fb_require_image';
const TF_FB_EXCLUDE_KEYWORDS = 'toutefois_fb_exclude_keywords'; // comma-separated
const TF_FB_LAST_CURSOR = 'toutefois_fb_last_cursor';
const TF_FB_LAST_NEXT_URL = 'toutefois_fb_last_next_url';
const TF_FB_CRON_INTERVAL = 'toutefois_fb_cron_interval'; // hourly|twicedaily|daily
const TF_FB_MAX_PAGES = 'toutefois_fb_max_pages';
const TF_FB_PAGE_SIZE = 'toutefois_fb_page_size';
// Token refresh related
const TF_FB_APP_ID = 'toutefois_fb_app_id';
const TF_FB_APP_SECRET = 'toutefois_fb_app_secret';
const TF_FB_USER_TOKEN = 'toutefois_fb_user_token'; // short/long-lived user token

// Register settings
add_action('admin_init', function() {
    $group = 'toutefois_fb';
    register_setting($group, TF_FB_PAGE_ID);
    register_setting($group, TF_FB_ACCESS_TOKEN);
    register_setting($group, TF_FB_EXCLUDE_EVENTS);
    register_setting($group, TF_FB_EXCLUDE_REELS);
    register_setting($group, TF_FB_REQUIRE_IMAGE);
    register_setting($group, TF_FB_EXCLUDE_KEYWORDS);
    register_setting($group, TF_FB_APP_ID);
    register_setting($group, TF_FB_APP_SECRET);
    register_setting($group, TF_FB_USER_TOKEN);
    register_setting($group, TF_FB_CRON_INTERVAL);
    register_setting($group, TF_FB_MAX_PAGES);
    register_setting($group, TF_FB_PAGE_SIZE);
});

// Admin-post manual actions
add_action('admin_post_toutefois_fb_sync_now', function() {
    if (!current_user_can('manage_options')) wp_die('Forbidden');
    check_admin_referer('toutefois_fb_sync_now');
    $max = (int) get_option(TF_FB_MAX_PAGES, 10);
    $size = (int) get_option(TF_FB_PAGE_SIZE, 25);
    toutefois_sync_facebook(max(1,$max), max(1,$size));
    $redirect = wp_get_referer();
    if (!$redirect) $redirect = admin_url('options-general.php?page=toutefois-fb-sync');
    wp_safe_redirect(add_query_arg('tffb', 'synced', $redirect));
    exit;
});

add_action('admin_post_toutefois_fb_refresh_now', function() {
    if (!current_user_can('manage_options')) wp_die('Forbidden');
    check_admin_referer('toutefois_fb_refresh_now');
    toutefois_fb_try_refresh_token(true);
    $redirect = wp_get_referer();
    if (!$redirect) $redirect = admin_url('options-general.php?page=toutefois-fb-sync');
    wp_safe_redirect(add_query_arg('tffb', 'refreshed', $redirect));
    exit;
});

add_action('admin_post_toutefois_fb_reset_cursor', function() {
    if (!current_user_can('manage_options')) wp_die('Forbidden');
    check_admin_referer('toutefois_fb_reset_cursor');
    delete_option(TF_FB_LAST_CURSOR);
    delete_option(TF_FB_LAST_NEXT_URL);
    $redirect = wp_get_referer();
    if (!$redirect) $redirect = admin_url('options-general.php?page=toutefois-fb-sync');
    wp_safe_redirect(add_query_arg('tffb', 'reset', $redirect));
    exit;
});

// Simple settings page
add_action('admin_menu', function() {
    add_options_page(
        'Toutefois Facebook Sync',
        'Toutefois Facebook',
        'manage_options',
        'toutefois-fb-sync',
        function() {
            if (!current_user_can('manage_options')) return;
            ?>
            <div class="wrap">
              <h1>Toutefois — Facebook Sync</h1>
              <form method="post" action="options.php">
                <?php settings_fields('toutefois_fb'); ?>
                <table class="form-table" role="presentation">
                  <tr>
                    <th scope="row"><label for="<?php echo esc_attr(TF_FB_PAGE_ID); ?>">Facebook Page ID</label></th>
                    <td><input type="text" class="regular-text" name="<?php echo esc_attr(TF_FB_PAGE_ID); ?>" id="<?php echo esc_attr(TF_FB_PAGE_ID); ?>" value="<?php echo esc_attr(get_option(TF_FB_PAGE_ID, '')); ?>"/></td>
                  </tr>
                  <tr>
                    <th scope="row"><label for="<?php echo esc_attr(TF_FB_ACCESS_TOKEN); ?>">Page Access Token (stocké serveur)</label></th>
                    <td><input type="password" class="regular-text" name="<?php echo esc_attr(TF_FB_ACCESS_TOKEN); ?>" id="<?php echo esc_attr(TF_FB_ACCESS_TOKEN); ?>" value="<?php echo esc_attr(get_option(TF_FB_ACCESS_TOKEN, '')); ?>"/></td>
                  </tr>
                  <tr>
                    <th scope="row">Filtres</th>
                    <td>
                      <label><input type="checkbox" name="<?php echo esc_attr(TF_FB_EXCLUDE_EVENTS); ?>" value="1" <?php checked(get_option(TF_FB_EXCLUDE_EVENTS, '1'), '1'); ?>/> Exclure événements</label><br/>
                      <label><input type="checkbox" name="<?php echo esc_attr(TF_FB_EXCLUDE_REELS); ?>" value="1" <?php checked(get_option(TF_FB_EXCLUDE_REELS, '1'), '1'); ?>/> Exclure reels</label><br/>
                      <label><input type="checkbox" name="<?php echo esc_attr(TF_FB_REQUIRE_IMAGE); ?>" value="1" <?php checked(get_option(TF_FB_REQUIRE_IMAGE, '1'), '1'); ?>/> Exiger image</label><br/>
                      <label>Mots-clés à exclure (séparés par des virgules):<br/>
                        <input type="text" class="regular-text" name="<?php echo esc_attr(TF_FB_EXCLUDE_KEYWORDS); ?>" value="<?php echo esc_attr(get_option(TF_FB_EXCLUDE_KEYWORDS, '')); ?>"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Planification</th>
                    <td>
                      <label for="<?php echo esc_attr(TF_FB_CRON_INTERVAL); ?>">Fréquence du CRON</label><br/>
                      <select name="<?php echo esc_attr(TF_FB_CRON_INTERVAL); ?>" id="<?php echo esc_attr(TF_FB_CRON_INTERVAL); ?>">
                        <?php $cur = get_option(TF_FB_CRON_INTERVAL, 'hourly'); ?>
                        <option value="hourly" <?php selected($cur, 'hourly'); ?>>Hourly</option>
                        <option value="twicedaily" <?php selected($cur, 'twicedaily'); ?>>Twice Daily</option>
                        <option value="daily" <?php selected($cur, 'daily'); ?>>Daily</option>
                      </select>
                      <p class="description">Change la fréquence du job d'import.</p>
                      <label>Max pages par sync<br/>
                        <input type="number" min="1" max="100" name="<?php echo esc_attr(TF_FB_MAX_PAGES); ?>" value="<?php echo esc_attr(get_option(TF_FB_MAX_PAGES, '10')); ?>"/>
                      </label><br/>
                      <label>Taille de page (limit)<br/>
                        <input type="number" min="1" max="100" name="<?php echo esc_attr(TF_FB_PAGE_SIZE); ?>" value="<?php echo esc_attr(get_option(TF_FB_PAGE_SIZE, '25')); ?>"/>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Auto-refresh access token (optionnel)</th>
                    <td>
                      <label>App ID<br/><input type="text" class="regular-text" name="<?php echo esc_attr(TF_FB_APP_ID); ?>" value="<?php echo esc_attr(get_option(TF_FB_APP_ID, '')); ?>"/></label><br/>
                      <label>App Secret<br/><input type="password" class="regular-text" name="<?php echo esc_attr(TF_FB_APP_SECRET); ?>" value="<?php echo esc_attr(get_option(TF_FB_APP_SECRET, '')); ?>"/></label><br/>
                      <label>User token (short/long-lived)<br/><input type="password" class="regular-text" name="<?php echo esc_attr(TF_FB_USER_TOKEN); ?>" value="<?php echo esc_attr(get_option(TF_FB_USER_TOKEN, '')); ?>"/></label>
                      <p class="description">Le plugin tentera d'échanger le user token en long-lived, puis d'obtenir un Page Access Token à partir de l'App ID/Secret et du Page ID.</p>
                    </td>
                  </tr>
                </table>
                <?php submit_button(); ?>
              </form>

              <hr/>
              <h2>Actions manuelles</h2>
              <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="display:inline-block;margin-right:10px;">
                <?php wp_nonce_field('toutefois_fb_sync_now'); ?>
                <input type="hidden" name="action" value="toutefois_fb_sync_now"/>
                <button type="submit" class="button button-primary">Sync Now</button>
              </form>
              <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="display:inline-block;margin-right:10px;">
                <?php wp_nonce_field('toutefois_fb_refresh_now'); ?>
                <input type="hidden" name="action" value="toutefois_fb_refresh_now"/>
                <button type="submit" class="button">Refresh Token Now</button>
              </form>
              <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="display:inline-block;">
                <?php wp_nonce_field('toutefois_fb_reset_cursor'); ?>
                <input type="hidden" name="action" value="toutefois_fb_reset_cursor"/>
                <button type="submit" class="button">Reset Cursor</button>
              </form>
            </div>
            <?php
        }
    );
});

function toutefois_fb_reschedule_sync_cron($interval = '') {
    $interval = $interval ? $interval : get_option(TF_FB_CRON_INTERVAL, 'hourly');
    $ts = wp_next_scheduled('toutefois_fb_sync_cron');
    if ($ts) wp_unschedule_event($ts, 'toutefois_fb_sync_cron');
    if (in_array($interval, array('hourly','twicedaily','daily'), true)) {
        wp_schedule_event(time() + 60, $interval, 'toutefois_fb_sync_cron');
    } else {
        wp_schedule_event(time() + 60, 'hourly', 'toutefois_fb_sync_cron');
    }
}

// Ensure CRON jobs exist and align with chosen interval
add_action('init', function() {
    if (!wp_next_scheduled('toutefois_fb_sync_cron')) {
        toutefois_fb_reschedule_sync_cron();
    } else {
        // Ensure schedule matches saved interval
        $saved = get_option(TF_FB_CRON_INTERVAL, 'hourly');
        // No direct way to read current schedule; reschedule to be safe
        toutefois_fb_reschedule_sync_cron($saved);
    }
    if (!wp_next_scheduled('toutefois_fb_refresh_token_cron')) {
        wp_schedule_event(time() + 120, 'daily', 'toutefois_fb_refresh_token_cron');
    }
});

// Reschedule when interval changes
add_action('update_option_' . TF_FB_CRON_INTERVAL, function($old, $new) {
    toutefois_fb_reschedule_sync_cron($new);
}, 10, 2);

add_action('toutefois_fb_sync_cron', 'toutefois_sync_facebook');
add_action('toutefois_fb_refresh_token_cron', 'toutefois_fb_try_refresh_token');

// REST endpoint to trigger sync manually (admin only)
add_action('rest_api_init', function () {
    register_rest_route('toutefois/v1', '/facebook-sync', array(
        'methods' => 'POST',
        'permission_callback' => function() { return current_user_can('manage_options'); },
        'callback' => function() {
            $res = toutefois_sync_facebook();
            return rest_ensure_response($res);
        }
    ));
    register_rest_route('toutefois/v1', '/facebook-refresh-token', array(
        'methods' => 'POST',
        'permission_callback' => function() { return current_user_can('manage_options'); },
        'callback' => function() {
            $ok = toutefois_fb_try_refresh_token(true);
            return rest_ensure_response(array('refreshed' => (bool)$ok));
        }
    ));
});

function toutefois_fb_fetch_feed($args = array()) {
    $page_id = get_option(TF_FB_PAGE_ID, '');
    $token = get_option(TF_FB_ACCESS_TOKEN, '');
    if (empty($page_id) || empty($token)) return array('data' => array());

    $defaults = array('limit' => 25, 'after' => '', 'before' => '');
    $args = wp_parse_args($args, $defaults);

    $fields = implode(',', array(
        'permalink_url',
        'full_picture',
        'height',
        'message',
        'created_time',
        // Request media image sources for primary and subattachments to support multi-image posts
        'attachments{title,url,type,media_type,media{image{src}},subattachments{media{image{src}}}}'
    ));
    $params = array('fields' => $fields, 'limit' => (int)$args['limit'], 'access_token' => $token);
    if (!empty($args['after'])) $params['after'] = $args['after'];
    if (!empty($args['before'])) $params['before'] = $args['before'];

    $url = add_query_arg($params, 'https://graph.facebook.com/v23.0/' . rawurlencode($page_id) . '/feed');
    $response = wp_remote_get($url, array('timeout' => 25));
    if (is_wp_error($response)) return array('data' => array());
    $code = wp_remote_retrieve_response_code($response);
    if ($code < 200 || $code >= 300) return array('data' => array());
    $data = json_decode(wp_remote_retrieve_body($response), true);
    return is_array($data) ? $data : array('data' => array());
}

function toutefois_fb_passes_filters($post) {
    $exclude_events = get_option(TF_FB_EXCLUDE_EVENTS, '1') === '1';
    $exclude_reels = get_option(TF_FB_EXCLUDE_REELS, '1') === '1';
    $require_image = get_option(TF_FB_REQUIRE_IMAGE, '1') === '1';
    $exclude_keywords_raw = strtolower((string)get_option(TF_FB_EXCLUDE_KEYWORDS, ''));
    $exclude_keywords = array_filter(array_map('trim', explode(',', $exclude_keywords_raw)));

    $permalink = isset($post['permalink_url']) ? (string)$post['permalink_url'] : '';
    $picture = isset($post['full_picture']) ? (string)$post['full_picture'] : '';
    $attachments = isset($post['attachments']['data']) && is_array($post['attachments']['data']) ? $post['attachments']['data'] : array();
    $primary = !empty($attachments) ? $attachments[0] : array();
    $attachment_type = isset($primary['type']) ? (string)$primary['type'] : '';

    if ($exclude_events && ($attachment_type === 'event' || strpos($permalink, '/events/') !== false)) return false;
    if ($exclude_reels && strpos($permalink, '/reel/') !== false) return false;
    // Determine if there is any image available (primary, media image, or subattachments images)
    $has_any_image = !empty($picture);
    if (!$has_any_image && !empty($attachments)) {
        foreach ($attachments as $att) {
            if (!empty($att['media']['image']['src'])) { $has_any_image = true; break; }
            if (!empty($att['subattachments']['data']) && is_array($att['subattachments']['data'])) {
                foreach ($att['subattachments']['data'] as $sub) {
                    if (!empty($sub['media']['image']['src'])) { $has_any_image = true; break 2; }
                }
            }
        }
    }
    if ($require_image && !$has_any_image) return false;

    if (!empty($exclude_keywords)) {
        $msg = strtolower((string)($post['message'] ?? ''));
        foreach ($exclude_keywords as $kw) {
            if ($kw !== '' && strpos($msg, $kw) !== false) return false;
        }
    }
    return true;
}

function toutefois_fb_upsert_wp_post($fb) {
    $fb_id = $fb['id'];
    $existing = new WP_Query(array(
        'post_type' => 'post',
        'posts_per_page' => 1,
        'fields' => 'ids',
        'meta_query' => array(array('key' => '_fb_post_id', 'value' => $fb_id, 'compare' => '='))
    ));

    $title = wp_strip_all_tags(wp_trim_words((string)($fb['message'] ?? ''), 12, '…'));
    if ($title === '') $title = 'Publication Facebook';

    $content = '';
    if (!empty($fb['message'])) $content .= wp_kses_post($fb['message']);
    if (!empty($fb['permalink_url'])) $content .= '<p><a href="' . esc_url($fb['permalink_url']) . '" target="_blank" rel="noopener">Voir sur Facebook</a></p>';

    $postarr = array(
        'post_title' => $title,
        'post_content' => $content,
        'post_status' => 'publish',
        'post_type' => 'post',
        'post_date' => isset($fb['created_time']) ? gmdate('Y-m-d H:i:s', strtotime($fb['created_time'])) : current_time('mysql', true),
    );

    if ($existing->have_posts()) {
        $postarr['ID'] = (int)$existing->posts[0];
        $post_id = wp_update_post($postarr, true);
    } else {
        $post_id = wp_insert_post($postarr, true);
    }
    if (is_wp_error($post_id) || !$post_id) return;

    update_post_meta($post_id, '_fb_post_id', $fb_id);
    if (!empty($fb['permalink_url'])) update_post_meta($post_id, '_fb_permalink', esc_url_raw($fb['permalink_url']));
    // Store originating Facebook Page info for multi-page support
    $fb_page_id = '';
    $fb_page_name = '';
    // Prefer explicit 'from' if provided by Graph API
    if (!empty($fb['from']['id']) && is_string($fb['from']['id'])) {
        $fb_page_id = (string)$fb['from']['id'];
    }
    if (!empty($fb['from']['name']) && is_string($fb['from']['name'])) {
        $fb_page_name = (string)$fb['from']['name'];
    }
    // Fallback: parse composite post id like PAGEID_POSTID
    if (!$fb_page_id && strpos($fb_id, '_') !== false) {
        $parts = explode('_', $fb_id, 2);
        if (!empty($parts[0])) $fb_page_id = (string)$parts[0];
    }
    if ($fb_page_id) update_post_meta($post_id, '_fb_page_id', $fb_page_id);
    if ($fb_page_name) update_post_meta($post_id, '_fb_page_name', $fb_page_name);

    // Featured image from full_picture
    // Sideload images (featured + gallery) with URL comparison to avoid duplicates
    $image_urls = toutefois_fb_collect_image_urls($fb);
    $gallery_ids = array();
    if (!empty($image_urls)) {
        require_once ABSPATH . 'wp-admin/includes/image.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';

        // Load or init URL→attachment map
        $url_map = get_post_meta((int)$post_id, '_fb_image_url_map', true);
        if (!is_array($url_map)) $url_map = array();

        foreach ($image_urls as $idx => $imgUrl) {
            $attachment_id = 0;
            if (isset($url_map[$imgUrl]) && $url_map[$imgUrl]) {
                $maybe_id = (int)$url_map[$imgUrl];
                // Verify attachment still exists
                if (get_post_status($maybe_id)) {
                    $attachment_id = $maybe_id;
                }
            }
            if (!$attachment_id) {
                $mid = media_sideload_image($imgUrl, (int)$post_id, $title, 'id');
                if (!is_wp_error($mid) && $mid) {
                    $attachment_id = (int)$mid;
                    $url_map[$imgUrl] = $attachment_id;
                }
            }
            if ($attachment_id) {
                $gallery_ids[] = $attachment_id;
                if ($idx === 0) {
                    set_post_thumbnail((int)$post_id, $attachment_id);
                }
            }
        }

        if (!empty($gallery_ids)) {
            // Append or update a gallery shortcode in content, force larger rendition
            $content_with_gallery = $content . "\n\n" . '[gallery size="large" ids="' . implode(',', $gallery_ids) . '"]';
            wp_update_post(array('ID' => (int)$post_id, 'post_content' => $content_with_gallery));
            update_post_meta((int)$post_id, '_fb_gallery_ids', $gallery_ids);
        } else {
            // Ensure content is at least up to date without gallery
            wp_update_post(array('ID' => (int)$post_id, 'post_content' => $content));
        }

        // Persist the URL map for future comparisons
        update_post_meta((int)$post_id, '_fb_image_url_map', $url_map);
    } else {
        // No images: keep content without gallery
        wp_update_post(array('ID' => (int)$post_id, 'post_content' => $content));
    }
}

function toutefois_sync_facebook($max_pages = 5, $page_size = 25) {
    $after = (string) get_option(TF_FB_LAST_CURSOR, '');
    $next_url = (string) get_option(TF_FB_LAST_NEXT_URL, '');
    $pages = 0;
    $imported = 0;

    while ($pages < $max_pages) {
        if (!empty($next_url)) {
            $data = toutefois_fb_fetch_url($next_url);
        } else {
            $data = toutefois_fb_fetch_feed(array('limit' => $page_size, 'after' => $after));
        }

        $items = isset($data['data']) && is_array($data['data']) ? $data['data'] : array();
        foreach ($items as $post) {
            if (toutefois_fb_passes_filters($post)) {
                toutefois_fb_upsert_wp_post($post);
                $imported++;
            }
        }

        // Advance cursors/links for the next loop
        $after = isset($data['paging']['cursors']['after']) ? (string)$data['paging']['cursors']['after'] : '';
        $next_url = isset($data['paging']['next']) ? (string)$data['paging']['next'] : '';
        $pages++;

        // Stop only when there is no next page at all
        if (empty($after) && empty($next_url)) {
            break;
        }
    }

    update_option(TF_FB_LAST_CURSOR, $after);
    update_option(TF_FB_LAST_NEXT_URL, $next_url);
    return array('pages' => $pages, 'imported' => $imported, 'last_after' => $after, 'last_next' => $next_url);
}

// Token refresh logic (optional, requires App ID/Secret and a user token)
function toutefois_fb_try_refresh_token($force = false) {
    $app_id = trim((string)get_option(TF_FB_APP_ID, ''));
    $app_secret = trim((string)get_option(TF_FB_APP_SECRET, ''));
    $user_token = trim((string)get_option(TF_FB_USER_TOKEN, ''));
    $page_id = trim((string)get_option(TF_FB_PAGE_ID, ''));
    if ($app_id === '' || $app_secret === '' || $user_token === '' || $page_id === '') return false;

    // Step 1: Exchange for a long-lived user token
    $exchange_url = add_query_arg(array(
        'grant_type' => 'fb_exchange_token',
        'client_id' => $app_id,
        'client_secret' => $app_secret,
        'fb_exchange_token' => $user_token,
    ), 'https://graph.facebook.com/v23.0/oauth/access_token');

    $resp = wp_remote_get($exchange_url, array('timeout' => 20));
    if (is_wp_error($resp)) return false;
    $code = wp_remote_retrieve_response_code($resp);
    if ($code < 200 || $code >= 300) return false;
    $data = json_decode(wp_remote_retrieve_body($resp), true);
    $long_user_token = isset($data['access_token']) ? $data['access_token'] : '';
    if ($long_user_token === '') return false;

    // Step 2: Get Page access token using the long-lived user token
    $page_url = add_query_arg(array('fields' => 'access_token', 'access_token' => $long_user_token), 'https://graph.facebook.com/v23.0/' . rawurlencode($page_id));
    $resp2 = wp_remote_get($page_url, array('timeout' => 20));
    if (is_wp_error($resp2)) return false;
    $code2 = wp_remote_retrieve_response_code($resp2);
    if ($code2 < 200 || $code2 >= 300) return false;
    $data2 = json_decode(wp_remote_retrieve_body($resp2), true);
    $page_token = isset($data2['access_token']) ? $data2['access_token'] : '';
    if ($page_token === '') return false;

    update_option(TF_FB_ACCESS_TOKEN, $page_token);
    // Also store the long-lived user token for future refreshes
    update_option(TF_FB_USER_TOKEN, $long_user_token);
    return true;
}
