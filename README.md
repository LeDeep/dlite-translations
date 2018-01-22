# Dlite-translations

The web application: [https://github.com/stateofca/dlite-web](https://github.com/stateofca/dlite-web) supports 10 languages. This small repository host the raw json in each of the files, along with lightweight code to aggregate those languages into one file.

Add raw per language json files in the `raw-data` directory. The nested
directory should be the ISO two character abbreviation for the language.

To translate these raw files to a per-language json file in
`translations` run:

    node index.js

Also, due to the reduced time between approval and time due to
translators, nesting, comma and other issues were found in these files
:(

Commas are fixed in commit `2510620184bc98bef4d12d2a63618c2719f06026`
Nesting and a typo are fixed in `063be2607350d84292fe8974c4b8eaae7d7e2d9f`

These will need to be used as reference to get the translations into the
same format, so that translation actually works!
