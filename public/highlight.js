import { highlightElements } from "https://cdn.jsdelivr.net/npm/zilite@0.0.25";
import { zig } from "https://cdn.jsdelivr.net/npm/zilite@0.0.25/src/language/zig.js";
import { bash } from "https://cdn.jsdelivr.net/npm/zilite@0.0.25/src/language/bash.js";
import { diff } from "https://cdn.jsdelivr.net/npm/zilite@0.0.25/src/language/diff.js";
highlightElements(zig, "language-zig");
highlightElements(bash, "language-bash");
highlightElements(bash, "language-console");
highlightElements(bash, "language-sh");
highlightElements(diff, "language-diff");
