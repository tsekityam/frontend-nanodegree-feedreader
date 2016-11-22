/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    it('all feeds has URL', function() {
      allFeeds.forEach(function(feed) {  // loops through each feed in the allFeeds object
        expect(feed.url).toBeDefined();  // ensures it has a URL defined
        expect(feed.url.length).toBeGreaterThan(0);  // ensures that the URL is not empty
      });
    });


    it('all feeds has name', function() {
      allFeeds.forEach(function(feed) {  // loops through each feed in the allFeeds object
        expect(feed.name).toBeDefined();  // ensures it has a name defined
        expect(feed.name.length).toBeGreaterThan(0);  // ensures that the name is not empty
      });
    });
  });


  describe('The menu', function() {
    it('menu is hidden by default', function() {
      // ensures the right border of the side menu is at 0, which means the menu is not visible.
      expect(document.getElementsByClassName('slide-menu')[0].getBoundingClientRect().right).toBe(0);
    });

    it("menu visibility changes when menu icon clicked", function() {
      var $menu = $('.slide-menu');

      var originalTransition = $menu.css('transition'); // store the current transition, for reset it later
      $menu.css('transition', 'all 0s ease 0s');  // remove the transition

      // click the menu icon
      var $menuIconLink = $('.menu-icon-link');
      if ($menuIconLink.size() > 0) {
        $menuIconLink[0].click();
      }
      // see if the menu is visible or not
      if ($menu.size() > 0) {
        expect($menu[0].getBoundingClientRect().left).toBe(0);
      }

      // click the menu icon again
      if ($menuIconLink.size() > 0) {
        $menuIconLink[0].click();
      }
      // see if the menu is hidden or not
      if ($menu.size() > 0) {
        expect($menu[0].getBoundingClientRect().right).toBe(0);
      }

      $menu.css('transition', originalTransition);  // restore the original transitions
    });
  });

  describe('Initial Entries', function() {

     // the menu is visible by the click in parent level, now we click it once more time
     beforeEach(function(done) {
       if (allFeeds.length > 0) {
         loadFeed(0, function() {
           done();
         });
       }
     });

     it('at least a single .entry element within the .feed container', function(done) {
       expect($('.feed').find('.entry').size()).toBeGreaterThan(0);
       done();
     });
  });

  describe('New Feed Selection', function() {
    var originalFirstEntry,
        entries,
        container = $('.feed');

    // the menu is visible by the click in parent level, now we click it once more time
    beforeEach(function(done) {
      entries = container.find('.entry');
      if (entries.size() > 0) {
        originalFirstEntry = container.find('.entry')[0];
        loadFeed(0, function() {
          done();
        });
      }
   });

    it('content actually changes', function(done) {
      entries = container.find('.entry');
      if (entries.size() > 0) {
        expect(entries[0]).not.toBe(originalFirstEntry);
      }
      done();
    });
  });
}());
