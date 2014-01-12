<?php
    $base = realpath('.');

    $include = array();

    // Dbms
    $include []= realpath('./libs/dbms.js');

    // Models
    $models = glob(realpath('./models').DIRECTORY_SEPARATOR.'*.js', GLOB_BRACE);
    foreach ($models as $model) {
        $include []= $model;
    }

    // Controllers
    $controllers = glob(realpath('./controllers').DIRECTORY_SEPARATOR.'*_controller.js', GLOB_BRACE);
    foreach ($controllers as $controller) {
        $include []= $controller;
    }

    $include []= realpath('./db/tables.js');

    $include []= realpath('./db/data.js');
    $include []= realpath('./db/datainsert.js');

    $include []= realpath('./app.js');

    $js = '';
    foreach ($include as $file) {
        $js .= file_get_contents($file);
    }

    header('Content-Type: application/javascript');
    echo $js;
?>