<?php

/**
 * API Placeholder Theme functions and definitions
 *
 * @package API_Placeholder_Theme
 */

/**
 * Register custom theme colors for Gutenberg editor
 */
function api_placeholder_theme_colors()
{
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => __('Toutefois Red', 'api-placeholder-theme'),
            'slug'  => 'toutefois-red',
            'color' => '#862331',
        ),
        array(
            'name'  => __('Toutefois Purple', 'api-placeholder-theme'),
            'slug'  => 'toutefois-purple',
            'color' => '#5A3D55',
        ),
        array(
            'name'  => __('Toutefois Dark', 'api-placeholder-theme'),
            'slug'  => 'toutefois-dark',
            'color' => '#333333',
        ),
        array(
            'name'  => __('Toutefois Teal', 'api-placeholder-theme'),
            'slug'  => 'toutefois-teal',
            'color' => '#588B8B',
        ),
        array(
            'name'  => __('Toutefois Primary Text', 'api-placeholder-theme'),
            'slug'  => 'toutefois-primary-text',
            'color' => '#2F2C58',
        ),
        array(
            'name'  => __('Toutefois Secondary Text', 'api-placeholder-theme'),
            'slug'  => 'toutefois-secondary-text',
            'color' => '#6B1E2C',
        ),
        array(
            'name'  => __('Toutefois Light Text', 'api-placeholder-theme'),
            'slug'  => 'toutefois-light-text',
            'color' => '#F5F3EE',
        )
    ));
}
add_action('after_setup_theme', 'api_placeholder_theme_colors');

/**
 * Ensure proper REST API functionality
 */
function api_placeholder_theme_setup()
{
    // Make sure REST API is enabled
    add_filter('rest_enabled', '__return_true');
    add_filter('rest_jsonp_enabled', '__return_true');

    // Ensure proper REST URL
    add_filter('rest_url_prefix', function ($prefix) {
        return 'wp-json';
    });
}
add_action('after_setup_theme', 'api_placeholder_theme_setup');

/**
 * Remove filters that might interfere with REST API
 */
function api_placeholder_theme_rest_init()
{
    // Highest priority to ensure our modifications happen last
    remove_filter('template_redirect', 'redirect_canonical');

    // Add debugging headers to REST API responses
    add_filter('rest_pre_serve_request', function ($served, $result) {
        header('X-WP-API-Status: Enabled');
        return $served;
    }, 10, 2);
}
add_action('rest_api_init', 'api_placeholder_theme_rest_init', 9999);
