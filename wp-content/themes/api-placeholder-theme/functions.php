<?php
/**
 * API Placeholder Theme functions and definitions
 *
 * @package API_Placeholder_Theme
 */

/**
 * Ensure proper REST API functionality
 */
function api_placeholder_theme_setup() {
    // Make sure REST API is enabled
    add_filter('rest_enabled', '__return_true');
    add_filter('rest_jsonp_enabled', '__return_true');
    
    // Ensure proper REST URL
    add_filter('rest_url_prefix', function($prefix) {
        return 'wp-json';
    });
}
add_action('after_setup_theme', 'api_placeholder_theme_setup');

/**
 * Remove filters that might interfere with REST API
 */
function api_placeholder_theme_rest_init() {
    // Highest priority to ensure our modifications happen last
    remove_filter('template_redirect', 'redirect_canonical');
    
    // Add debugging headers to REST API responses
    add_filter('rest_pre_serve_request', function($served, $result) {
        header('X-WP-API-Status: Enabled');
        return $served;
    }, 10, 2);
}
add_action('rest_api_init', 'api_placeholder_theme_rest_init', 9999);
