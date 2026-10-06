/**
 * Standalone Studio — Site configuration
 * Single source of truth for URLs, contacts and social accounts.
 * Must be loaded FIRST (creates the global `SS` namespace).
 */
(function () {
  'use strict';

  // Resolve the site root from this script's location so pages in
  // sub-folders (e.g. /paperleaf/) can build correct links.
  var script = document.currentScript;
  var root = script ? script.src.replace(/js\/config\.js(\?.*)?$/, '') : '/';

  window.SS = {
    root: root,

    /** Build an absolute URL relative to the site root. */
    url: function (path) {
      return root + (path || '').replace(/^\//, '');
    },

    config: {
      siteName: 'Standalone Studio',
      email: 'stalone.studio@gmail.com',
      defaultLang: 'en',
      supportedLangs: ['en', 'id'],
      storageKeyLang: 'ss_lang',

      // Android download link for Paperleaf. Set to null to show "Coming soon".
      paperleafDownloadUrl: 'https://play.google.com/store/apps/details?id=com.paperleaf.scrapbook',

      social: [
        {
          id: 'instagram',
          label: 'Instagram',
          accounts: [
            { handle: '@paperleaf.app', url: 'https://www.instagram.com/paperleaf.app/' },
            { handle: '@stalone.studio', url: 'https://www.instagram.com/stalone.studio/' },
            { handle: '@saidattaufiq', url: 'https://www.instagram.com/saidattaufiq/' }
          ]
        },
        {
          id: 'threads',
          label: 'Threads',
          accounts: [
            { handle: '@paperleaf.app', url: 'https://www.threads.net/@paperleaf.app' },
            { handle: '@stalone.studio', url: 'https://www.threads.net/@stalone.studio' },
            { handle: '@saidattaufiq', url: 'https://www.threads.net/@saidattaufiq' }
          ]
        },
        {
          id: 'tiktok',
          label: 'TikTok',
          accounts: [
            { handle: '@paperleaf.app', url: 'https://www.tiktok.com/@paperleaf.app' },
            { handle: '@stalone.studio', url: 'https://www.tiktok.com/@stalone.studio' },
            { handle: '@saidattaufiq', url: 'https://www.tiktok.com/@saidattaufiq' }
          ]
        },
        {
          id: 'youtube',
          label: 'YouTube',
          accounts: [
            { handle: 'Standalone Studio', url: 'https://youtube.com/@standalonestudio-t1s' }
          ]
        }
      ]
    }
  };
})();
