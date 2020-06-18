// ==UserScript==
// @name         Script Options
// @namespace    https://github.com/erickRecai
// @version      1.02.02
// @description  requires ctoolbar, script options saved to local storage, unique to each domain.
// @author       guyRicky

// @match        *://*/*

// @exclude      *://docs.google.com/*

// @require      https://code.jquery.com/jquery-3.4.1.min.js

// ==/UserScript==
/* jshint esversion: 6 */

(function() {
    'use strict';
    /*
    == last update: 6/17/20 ==
    */

    // ==== script options ========================================================================|

    /*
    [0]: initial option state
    [1]: key name, id name
    [2]: option label
    [4]: which container to append to.
    */
    const fhdTag = "fhd";
    const rpltTag = "rplt";
    let elementContainer = 1; // ==== container 1 =================================================|
    let scriptOptionsArray = [
        
        // sort with more likely to be changed toward the top.

        // ==== main options ====
        [false, "enable "+ rpltTag +" script", "enbl "+ rpltTag, elementContainer], // default true;
        [true, rpltTag +" mark checked", rpltTag +" mrk chkd", elementContainer], // default true;
        [true, "enable "+ rpltTag +" dynamic checking", rpltTag +" dyn chk", elementContainer], // default true;

        // ==== utility ====
        [false, "enable "+ rpltTag +" counter", rpltTag +" count", elementContainer], // default false;
        [false, "enable "+ rpltTag +" notifs", rpltTag +" notifs", elementContainer], // default false;

        // ==== logging ====
        [false, "log "+ rpltTag +" msg", rpltTag +" log msg", elementContainer], // default false;
        [false, "log "+ rpltTag +" all", rpltTag +" log all", elementContainer], // default false;
        [false, "log "+ rpltTag +" runtime", rpltTag +" rt", elementContainer], // default false;

        // ==== script unique ====
        [false, "enable full delete", rpltTag +" f repl", elementContainer], // default true;
    ];

    elementContainer = 2; // ==== container 2 =====================================================|
    scriptOptionsArray = scriptOptionsArray.concat([
        // ==== main options ====
        [true, "enable "+ fhdTag +" script", "enbl "+ fhdTag, elementContainer], // default true;
        [true, fhdTag +" mark checked", fhdTag +" mrk chkd", elementContainer], // default true;
        [true, "enable "+ fhdTag +" dynamic checking", fhdTag +" dyn chk", elementContainer], // default true;

        // ==== utility ====
        [false, "enable "+ fhdTag +" counter", fhdTag +" count", elementContainer], // default false;
        [false, "enable "+ fhdTag +" notifs", fhdTag +" notifs", elementContainer], // default false;

        // ==== logging ====
        [false, "log "+ fhdTag +" msg", fhdTag +" log msg", elementContainer], // default false;
        [false, "log "+ fhdTag +" all", fhdTag +" log all", elementContainer], // default false;
        [false, "log "+ fhdTag +" runtimes", fhdTag +" rt", elementContainer], // default false;

        // ==== script unique ====
        [true, "enable "+ fhdTag +" css", "enbl "+ fhdTag +" css", elementContainer], // default true;
    ]);

    elementContainer = 3; // ==== container 3 =====================================================|
    scriptOptionsArray = scriptOptionsArray.concat([
        // ==== gen options ====
        [false, "autohide notifications", "temp notif", elementContainer], // default false;
        [true, "delete delete2", "dlt dlt2", elementContainer], // default true;
        [false, "disable delete", "dsbl dlt", elementContainer], // default false; disable to check double check deleted items.
    ]);

    elementContainer = 4; // ==== container 4 =====================================================|
    scriptOptionsArray = scriptOptionsArray.concat([
        // ==== custom rules ====
    ]);

    elementContainer = 5; // ==== container 5 =====================================================|
    scriptOptionsArray = scriptOptionsArray.concat([
        // ==== general rules ====
        [true, "enable delete1", "dlt1", elementContainer],
        [true, "enable delete2", "dlt2", elementContainer],
        [true, "enable lowlight1", "ll1", elementContainer],
        [true, "enable lowlight2", "ll2", elementContainer],
        [true, "enable highlight1", "hl1", elementContainer],
    ]);

    const ctbContainerId = "ctb-container2";

    // requires collapsable toolbar
    if (jQuery("#"+ ctbContainerId).length) {

        // ==== initialize container ==============================================================|

        const scriptPrefix = "opt";

        const visibleClass = "ctb-visible";
        const hiddenClass = "ctb-hidden";
        let startingStateClass = visibleClass;
        let otherStartingStateClass = hiddenClass;

        let startCollapsed = 0; // 1 to start collapsed, 0 to start uncollapsed.
        const localStorageName = "op start collapsed";
        if (window.localStorage.getItem(localStorageName)) {
            startCollapsed = window.localStorage.getItem(localStorageName);
            startCollapsed = (startCollapsed == "true");
        }
        if (startCollapsed) {
            startingStateClass = hiddenClass;
            otherStartingStateClass = visibleClass;
        }

        const containerId0 = scriptPrefix +"-options0";
        const containerId1 = scriptPrefix +"-options1";
        const containerId2 = scriptPrefix +"-options2";
        const containerId3 = scriptPrefix +"-options3";
        const containerId4 = scriptPrefix +"-options4";
        const containerId5 = scriptPrefix +"-options5";

        const optionsColorCode1 = "e0bf7c";
        const optionsColorCode2 = "dcb86d";
        const optionsColorCode3 = "b09357";
        const optionsColorCode4 = "846e41";

        const openButtonId = scriptPrefix +"-open";
        const hideButtonId = scriptPrefix +"-hide";

        /*
        [open]
        [hide]
        [ options 0
            [1] fbt options
            [2] general options

            [3] highlight/replace
            [4] delete/lowlight
        ]
        */

        // prepend = push
        jQuery("#"+ ctbContainerId).append("<div id='"+ openButtonId +"' class='"+ otherStartingStateClass +" ctb-green ctb-rounded-block'>s opt open</div>");
        jQuery("#"+ ctbContainerId).append("<div id='"+ hideButtonId +"' class='"+ startingStateClass +" ctb-red ctb-rounded-block'>s opt hide</div>");
        jQuery("#"+ ctbContainerId).append('<div id="'+ containerId0 +'" class="'+ startingStateClass +'"></div>');
        
        jQuery("#"+ containerId0).append('<div id="'+ containerId1 +'" class="script-option-block"></div>');
        jQuery("#"+ containerId0).append('<div id="'+ containerId2 +'" class="script-option-block"></div>');
        jQuery("#"+ containerId0).append('<div id="'+ containerId3 +'" class="script-option-block"></div>');
        jQuery("#"+ containerId0).append('<div id="'+ containerId4 +'" class="script-option-block"></div>');
        jQuery("#"+ containerId0).append('<div id="'+ containerId5 +'" class="script-option-block"></div>');

        const scriptOptionsCss =
`<style type="text/css">
    .script-option-block {
        padding: 2px 0;
    }
    .script-option{
        height: 15px;
        margin: 1px 0;
    }
    #`+ containerId1 +` {
        background: #`+ optionsColorCode1 +`;
    }
    #`+ containerId2 +` {
        background: #`+ optionsColorCode2 +`;
    }
    #`+ containerId3 +` {
        background: #`+ optionsColorCode3 +`;
    }
    #`+ containerId4 +` {
        background: #`+ optionsColorCode4 +`;
    }
    #`+ containerId5 +` {
        background: #aaa;
    }
    #`+ containerId2 +`,
    #`+ containerId3 +`,
    #`+ containerId4 +`,
    #`+ containerId5 +`
    {
        margin-top: 3px !important;
    }
    .script-option>div {
        float: left;
        white-space: nowrap;
        max-width: 60px;
    }

    #ctb-main-container input[type=checkbox] {
        display: inline-block !important;
        webkit-appearance: button;

        max-width: 15px;
        max-height: 15px;
        margin: 0 3px;
        float: left;
    }
</style>`;
        jQuery(document.body).append(scriptOptionsCss); //bottom of the body
        // ==== open/hide events ==================================================================|

        jQuery("#"+ openButtonId).click(function () {
            //console.log(openButtonId);
            window.localStorage.setItem(localStorageName, false);

            jQuery("#"+ containerId0).removeClass(hiddenClass);
            jQuery("#"+ containerId0).addClass(visibleClass);
            jQuery("#"+ openButtonId).removeClass(visibleClass);
            jQuery("#"+ openButtonId).addClass(hiddenClass);
            jQuery("#"+ hideButtonId).removeClass(hiddenClass);
            jQuery("#"+ hideButtonId).addClass(visibleClass);
        });
        jQuery("#"+ hideButtonId).click(function () {
            //console.log(hideButtonId);
            window.localStorage.setItem(localStorageName, true);

            jQuery("#"+ containerId0).removeClass(visibleClass);
            jQuery("#"+ containerId0).addClass(hiddenClass);
            jQuery("#"+ openButtonId).removeClass(hiddenClass);
            jQuery("#"+ openButtonId).addClass(visibleClass);
            jQuery("#"+ hideButtonId).removeClass(visibleClass);
            jQuery("#"+ hideButtonId).addClass(hiddenClass);
        });

        // ==== initial loop ======================================================================|
        let eventSelector;
        for (let index = 0; index < scriptOptionsArray.length; index++) {

            let optionInitialState = scriptOptionsArray[index][0];

            // retrieve local storage data
            let localStorageName = scriptOptionsArray[index][1];
            scriptOptionsArray[index][4] = window.localStorage.getItem(localStorageName); //"true", "false" or null
            let localStorageValue = scriptOptionsArray[index][4];

            // set up html elements and events
            let optionLabel = scriptOptionsArray[index][2];
            let optionId = scriptOptionsArray[index][1].replace(/ /g,"-");
            let parentContainer = scriptOptionsArray[index][3];

            if (parentContainer == 1 ) {
                jQuery("#"+ containerId1).append('<div class="script-option"><input type="checkbox" id="'+ optionId +'"><div>'+ optionLabel +'</div></div>');
            }else if (parentContainer == 2 ) {
                jQuery("#"+ containerId2).append('<div class="script-option"><input type="checkbox" id="'+ optionId +'"><div>'+ optionLabel +'</div></div>');
            }else if (parentContainer == 3 ) {
                jQuery("#"+ containerId3).append('<div class="script-option"><input type="checkbox" id="'+ optionId +'"><div>'+ optionLabel +'</div></div>');
            }else if (parentContainer == 4 ) {
                jQuery("#"+ containerId4).append('<div class="script-option"><input type="checkbox" id="'+ optionId +'"><div>'+ optionLabel +'</div></div>');
            }else if (parentContainer == 5 ) {
                jQuery("#"+ containerId5).append('<div class="script-option"><input type="checkbox" id="'+ optionId +'"><div>'+ optionLabel +'</div></div>');
            }
            if (eventSelector) {
                eventSelector += ", #"+ optionId;
            }else {
                eventSelector = "#"+ optionId;
            }

            // match to local storage or setup local storage.
            if (localStorageValue) { //"true", "false" or null
                localStorageValue = (localStorageValue == "true"); //true or false
                if (localStorageValue) {
                    document.getElementById(optionId).checked = true;
                }
            }else { //case: local storage data is not set
                window.localStorage.setItem(localStorageName, optionInitialState);
                if (optionInitialState) {
                    document.getElementById(optionId).checked = true;
                }
            }

        }
        console.log("eventSelector: "+ eventSelector);
        jQuery(eventSelector).click(updateOptions);

        // ==== BA. updateOptions() ===============================================================|

        const enableConsoleMessages = 1;
        const enabledMessages = /^ST/;
        function consolelog(text, messageType) {
            if (enableConsoleMessages && enabledMessages.test(messageType)) {
                console.log(text);
            }
        }

        // updates local storage data if different from options shown in the html element.
        function updateOptions() {

            for (let index = 0; index < scriptOptionsArray.length; index++) {

                let optionId = scriptOptionsArray[index][1].replace(/ /g,"-");
                let htmlOptionState = document.getElementById(optionId).checked;

                // retrieve local storage data
                let localStorageName = scriptOptionsArray[index][1];
                let localStorageValue = (window.localStorage.getItem(localStorageName) == "true"); // true or false

                if (htmlOptionState && !localStorageValue) {
                    window.localStorage.setItem(localStorageName, true);
                    consolelog(optionId +" state: "+ htmlOptionState, "ST"); //state message
                }else if (!htmlOptionState && localStorageValue) {
                    window.localStorage.setItem(localStorageName, false);
                    consolelog(optionId +" state: "+ htmlOptionState, "ST"); //state message
                }
            } // end for (each scriptOption)

        } // end function updateOptions()

    } // end if (jQuery("#ctb-buttons").length)

})();