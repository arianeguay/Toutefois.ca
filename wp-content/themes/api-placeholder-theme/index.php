<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php bloginfo('name'); ?> - API Only</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #f0f0f1;
            color: #444;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }

        .container {
            padding: 2em 3em;
            background-color: #fff;
            border: 1px solid #c3c4c7;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .04);
        }

        h1 {
            font-size: 1.5em;
            margin-top: 0;
            color: #1d2327;
        }
    </style>
    <?php wp_head(); ?>
</head>

<body>
    <div class="container">
        <h1>This site is intended for API use only.</h1>
        <p>For assistance, please contact an administrator.</p>
        <a href="<?php echo wp_login_url(); ?>">Login</a>

    </div>
    <?php wp_footer(); ?>
</body>

</html>