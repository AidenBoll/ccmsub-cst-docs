const q = document.querySelector.bind(document);
const qq = document.querySelectorAll.bind(document);

/*
    Expand all top-level navigation collapsers by default.
*/
document.addEventListener('DOMContentLoaded', () => {
    // Mkdocs adds the accordion buttons via a JavaScript files that's loaded
    // AFTER whatever I specify in the YAML's extra_js option.
    // But settings a 10-ms delay *seems* to work fine.
    setTimeout(() => {

        qq('.wy-menu li[class*="toctree"]').forEach(li => {
            // li.querySelector('a > .toctree-expand')?.remove();
            li.classList.add('current');
            li.setAttribute('aria-expanded', 'true');
        });

    }, 10);
});

/*
    Later me with an update on the expander buttons:
    I overrode the "scripts" Jinja block in custom_theme/main.html.
    I got rid of the block that enables the SphinxRtdTheme navigation,
    which was responsible for creating those buttons in the first place.
    I'm still having to go through and set .current and [aria-expanded="true"]
    on the <li>s to get the layout to play nice with the default CSS though.
*/