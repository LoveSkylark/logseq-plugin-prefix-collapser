Here is an example README file that could be included with the namespace collapser plugin:

# Namespace Collapser

A LogSeq plugin that collapses long namespace prefixes in page references.

## Features

- Collapses namespace prefixes leaving the page name. E.g. `src/components/Button` → `›Button`

- Customize the namespace symbol that is displayed.

- Configure a keyboard shortcut to toggle collapsing on/off. 

- Collapsed namespaces update automatically on edits.

- Debouncing and mutation observer optimize performance.

## Usage

- Install from [GitHub repo link]

- Set namespace symbol and toggle hotkey in plugin settings

- Trigger hotkey to collapse namespaces on current page

- Editing a page will re-collapse namespaces

- Disable plugin with hotkey to expand namespaces

## Configuration

- `namespaceSymbol`: The symbol displayed before collapsed namespaces.

- `toggleKeystroke`: The hotkey used to toggle collapsing on and off.

## Compatibility

- Works on LogSeq v0.4.0 and above

- Supports light and dark themes

## Known Issues

- Very long page references may wrap onto multiple lines

- Collapsing state does not persist across LogSeq restarts
