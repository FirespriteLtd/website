import $ from "jquery";

$( window ).on('load', function() {
        $('.loading').fadeOut('fast');
});

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import home from './routes/home';
import contact from './routes/contact';
import work from './routes/work';
import games from './routes/games';
import support from './routes/support';

/** Populate Router instance with DOM routes */
const routes = new Router({
    // All pages
    common,
    home,
    contact,
    games,
    work,
    support
});

// Load Events
$(document).ready(() => routes.loadEvents());
