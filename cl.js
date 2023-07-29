// Constants
const PLUGIN_NAME = 'NamespacePrefixCollapser';

// Debounced expand
const debouncedExpandNamespaces = debounce(expandCollapsedNamespaces, 1000);

// Plugin State
let isPluginEnabled = true; 

// Mutation handler
let lastMutationObserverCallTime = 0;
const mutationObserverDelay = 1000;

// Selectors

// Get relevant namespace elements on page
const getNamespaceElements = () => {
  return document.querySelectorAll('a.page-ref[data-ref*="/"]:not(.collapsed-namespace)'); 
};

// Helper functions

// Get plugin configuration settings
const getPluginSettings = () => {
  return logseq.plugin.getConfig();  
};

// Collapse specific namespace element
const collapseNamespaceElement = (namespaceElement) => {
  const separatorIndex = namespaceElement.innerText.lastIndexOf('/');

  if (separatorIndex !== -1) {
    const namespaceText = namespaceElement.innerText.substring(separatorIndex + 1);

    const { namespaceSymbol } = getPluginSettings();

    namespaceElement.innerHTML = `${namespaceSymbol} ${namespaceText}`;
    namespaceElement.classList.add('collapsed-namespace');
  }
};

// Expand all collapsed namespaces  
const expandCollapsedNamespaces = () => {
  const namespaceElements = getNamespaceElements();

  namespaceElements.forEach((namespaceElement) => {
    const originalText = namespaceElement.innerText;

    namespaceElement.innerHTML = originalText;
    namespaceElement.classList.remove('collapsed-namespace');
  }); 
};

// Main functions

// Collapse namespaces on page load/mutation
const collapseNamespacesOnPage = () => {
  
  // Check if enabled
  if (!isPluginEnabled) return;

  // Collapse each element
  const namespaceElements = getNamespaceElements();
  namespaceElements.forEach(collapseNamespaceElement);
};

// Handler for mutation observer callback
const handleMutationObserverCall = () => {
  const now = Date.now();

  // Throttle callback based on delay variable
  if (now - lastMutationObserverCallTime > mutationObserverDelay) {
    collapseNamespacesOnPage();
    lastMutationObserverCallTime = now; 
  }
};

// Toggle plugin enable/disable
const togglePluginEnabled = () => {
  isPluginEnabled = !isPluginEnabled;

  // Update plugin state
  if (isPluginEnabled) {

    // Plugin is now enabled

    // Get namespace elements
    const namespaceElements = getNamespaceElements();

    // Collapse each element
    namespaceElements.forEach(collapseNamespaceElement);
  } else {  
    debouncedExpandNamespaces();
  }
}; 

// Handler for hotkey action
logseq.onAction('togglePlugin', () => {
  togglePluginEnabled();
  
  logseq.App.showMainUI('Plugin toggled');
});

// Observer 
const mutationObserver = new MutationObserver(handleMutationObserverCall);

// Initialization
logseq.ready(() => {
  debouncedExpandNamespaces();
});