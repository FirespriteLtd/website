import $ from "jquery";

$( window ).on('load', function() {
    //$('.loading').fadeOut('fast');
});

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import contact from './routes/contact';
import about from './routes/about';
import games from './routes/games';

/** Populate Router instance with DOM routes */
const routes = new Router({
    // All pages
    common,
    home,
    contact,
    games,
    about
});

// Load Events
$(document).ready(() => routes.loadEvents());
