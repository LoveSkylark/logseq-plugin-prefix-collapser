// Plugin State and Settings
let isPluginEnabled = true;
let lastMutationTime = 0;
const mutationDelay = 1000;

const getConfiguredToggleKey = () => {
  const settings = window.logseq.plugin.getConfig();
  return settings.toggleKeystroke || "Control+Shift+s";
};

// Functions
const collapseNamespaces = () => {
  if (!isPluginEnabled) return; // Check if the plugin is enabled before collapsing namespaces

  const namespaces = document.querySelectorAll('a.page-ref[data-ref*="/"]:not(.shrunk-namespace)');
  for (const element of namespaces) {
    const separatorIndex = element.innerText.lastIndexOf("/");
    if (separatorIndex !== -1) {
      const namespaceText = element.innerText.substring(separatorIndex + 1);

      // Get the namespace symbol from plugin settings
      const settings = window.logseq.plugin.getConfig();
      const namespaceSymbol = settings.namespaceSymbol || "›";

      element.innerHTML = `${namespaceSymbol} ${namespaceText}`;
      element.classList.add("shrunk-namespace");
    }
  }
};

const onMutation = () => {
  const currentTime = Date.now();
  if (currentTime - lastMutationTime > mutationDelay) {
    collapseNamespaces();
    lastMutationTime = currentTime;
  }
};

// Mutation Observer
const observerOptions = { subtree: true, attributes: true };
const watchTarget = document.getElementById("app-container");
const observer = new MutationObserver(onMutation);
observer.observe(watchTarget, observerOptions);

// Keystroke Handler
document.addEventListener("keydown", (event) => {
  const toggleKeystroke = getConfiguredToggleKey();
  const keyPressed = `${event.ctrlKey ? "Control+" : ""}${event.shiftKey ? "Shift+" : ""}${event.key}`;
  if (keyPressed === toggleKeystroke) {
    togglePlugin();
  }
});

// Plugin Enable/Disable Function
const togglePlugin = () => {
  isPluginEnabled = !isPluginEnabled;
  if (isPluginEnabled) {
    collapseNamespaces();
    logseq.App.showMsg("Namespace Prefixes Collapser enabled.");
  } else {
    // If the plugin is disabled, remove the collapsed namespaces and restore original texts
    const collapsedNamespaces = document.querySelectorAll('a.page-ref[data-ref*="/"].shrunk-namespace');
    for (const element of collapsedNamespaces) {
      const namespaceText = element.innerText;
      element.innerHTML = namespaceText;
      element.classList.remove("shrunk-namespace");
    }
    logseq.App.showMsg("Namespace Prefixes Collapser disabled.");
  }
};
