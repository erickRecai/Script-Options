# script-options
Adds basic userscript options to [Collapsable Toolbar](https://github.com/erickRecai/Collapsable-Toolbar), options are saved by domain.

![Full Toolbar](/instruction-images/aa-full-toolbar.png)

Creating options for other scripts is somewhat simple to create here.

Provides access to script options for [Filter, Highlight, & Delete (FHD)](https://github.com/erickRecai/Filter-Highlight-Delete) and [Replace Text (RPLT)](https://github.com/erickRecai/Replace-Text).

This script works mostly client side aside from the following external libraries:  
[jQuery](https://jquery.com/): Used to handle page events.

# Installation
Requires a browser extension that enables userscripts to install this userscript. I personally use Tampermonkey but other extensions should work as well.  

[Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)  
[Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

To install this script specifically, just the `.user.js` file needs to downloaded.

How the scripts are ordered are generally the order that they run. There is a required order if you want everything to show up correctly should you want an onscreen user interface.
1. [Collapsable Toolbar](https://github.com/erickRecai/Collapsable-Toolbar)
2. [Script Options](https://github.com/erickRecai/Script-Options)
3. [Custom Rules](https://github.com/erickRecai/Custom-Rules)
4. [Replace Text](https://github.com/erickRecai/Replace-Text)
5. [Filter, Highlight, & Delete](https://github.com/erickRecai/Filter-Highlight-Delete)