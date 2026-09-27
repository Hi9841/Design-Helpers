# GPUI Kit

Rust desktop components for [GPUI](https://github.com/zed-industries/zed/tree/main/crates/gpui). Four libraries, one site. Pick the library, then the page.

Part of [The largest library of component libraries](README.md).

| Library | What it is | Open |
| --- | --- | --- |
| Component | Themed, production controls | https://gpui-kit.com/component |
| Base | Unstyled behavior you style yourself | https://gpui-kit.com/base |
| Shell | JavaScript plugins drawn by GPUI, with no WebView | https://gpui-kit.com/shell |
| Docs | Install, windows, tests, fonts, and mobile | https://gpui-kit.com/docs |

The same control often exists in Component and Base. Use Component when the app wants the themed kit. Use Base when the app owns the visuals.

[Setup](#setup) · [Inputs](#inputs) · [Overlays](#overlays) · [Layout](#layout) · [Data](#data) · [Chat](#chat) · [Chrome](#chrome) · [All styled](#component) · [All base](#base) · [Shell](#shell) · [Docs](#docs)

Captured from [llms.txt](https://gpui-kit.com/llms.txt) on 2026-09-28, site v0.6.6. Descriptions are adapted from GPUI Kit. Credit GPUI Kit and the source page. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Code on those pages stays [Apache-2.0](https://github.com/longbridge/gpui-kit/blob/main/LICENSE-APACHE).

Source: https://github.com/longbridge/gpui-kit

## Find a page

### Setup

| Job | Open |
| --- | --- |
| Install | https://gpui-kit.com/docs/installation |
| Getting started | https://gpui-kit.com/docs/getting-started |
| Enable themes, dialogs, and toasts | https://gpui-kit.com/component/root |
| Theme | https://gpui-kit.com/component/theme |
| Tests | https://gpui-kit.com/docs/test |
| Icons and assets | https://gpui-kit.com/docs/assets |
| Fonts | https://gpui-kit.com/docs/fonts |
| Translations | https://gpui-kit.com/docs/i18n |
| Mobile | https://gpui-kit.com/docs/mobile |
| JavaScript shell | https://gpui-kit.com/shell |

### Inputs

| Job | Open |
| --- | --- |
| Button | https://gpui-kit.com/component/button |
| Toolbar toggle | https://gpui-kit.com/component/toggle |
| Toggle group | https://gpui-kit.com/base/primitives/toggle-group |
| Text field | https://gpui-kit.com/component/input |
| Multiline text | https://gpui-kit.com/component/textarea |
| Number field | https://gpui-kit.com/component/number-input |
| One-time code | https://gpui-kit.com/component/otp-input |
| Checkbox | https://gpui-kit.com/component/checkbox |
| Switch | https://gpui-kit.com/component/switch |
| Radio | https://gpui-kit.com/component/radio |
| Radio group | https://gpui-kit.com/base/primitives/radio-group |
| Slider | https://gpui-kit.com/component/slider |
| Select | https://gpui-kit.com/component/select |
| Searchable select | https://gpui-kit.com/component/combobox |
| Split button | https://gpui-kit.com/component/dropdown_button |
| Date | https://gpui-kit.com/component/date-picker |
| Calendar | https://gpui-kit.com/component/calendar |
| Color | https://gpui-kit.com/component/color-picker |
| Form | https://gpui-kit.com/component/form |
| Label | https://gpui-kit.com/component/label |
| Input with a button or icon | https://gpui-kit.com/component/input-group |

### Overlays

| Job | Open |
| --- | --- |
| Dialog | https://gpui-kit.com/component/dialog |
| Confirm a destructive action | https://gpui-kit.com/component/alert-dialog |
| Callout | https://gpui-kit.com/component/alert |
| Popover | https://gpui-kit.com/component/popover |
| Hover card | https://gpui-kit.com/component/hover-card |
| Tooltip | https://gpui-kit.com/component/tooltip |
| Menu | https://gpui-kit.com/component/menu |
| Command palette | https://gpui-kit.com/component/command |
| Sheet | https://gpui-kit.com/component/sheet |
| Popup | https://gpui-kit.com/base/primitives/popup |
| Toast | https://gpui-kit.com/component/notification |
| Unstyled toast stack | https://gpui-kit.com/base/primitives/toast |
| Empty state | https://gpui-kit.com/component/empty |
| Skeleton | https://gpui-kit.com/component/skeleton |
| Loading text | https://gpui-kit.com/component/shimmer |
| Spinner | https://gpui-kit.com/component/spinner |
| Progress | https://gpui-kit.com/component/progress |

### Layout

| Job | Open |
| --- | --- |
| Sidebar | https://gpui-kit.com/component/sidebar |
| Tabs | https://gpui-kit.com/component/tabs |
| Accordion | https://gpui-kit.com/component/accordion |
| Show or hide a region | https://gpui-kit.com/component/collapsible |
| Scroll area | https://gpui-kit.com/component/scrollable |
| Scrollbar | https://gpui-kit.com/base/primitives/scrollbar |
| Pagination | https://gpui-kit.com/component/pagination |
| Stepper | https://gpui-kit.com/component/stepper |
| Navigation stack | https://gpui-kit.com/base/primitives/nav-stack |
| Dock | https://gpui-kit.com/component/dock |
| Resizable panes | https://gpui-kit.com/component/resizable |
| Link | https://gpui-kit.com/base/primitives/link |
| Group | https://gpui-kit.com/component/group-box |
| Focus trap | https://gpui-kit.com/component/focus-trap |

### Data

| Job | Open |
| --- | --- |
| Table | https://gpui-kit.com/component/table |
| Large data table | https://gpui-kit.com/component/data-table |
| Key-value details | https://gpui-kit.com/component/description-list |
| List | https://gpui-kit.com/component/list |
| Long list | https://gpui-kit.com/component/virtual-list |
| Tree | https://gpui-kit.com/component/tree |
| Charts | https://gpui-kit.com/component/chart |
| Custom plot | https://gpui-kit.com/component/plot |
| Code editor | https://gpui-kit.com/component/editor |
| Markdown or HTML | https://gpui-kit.com/component/text-view |
| Image | https://gpui-kit.com/component/image |
| Carousel | https://gpui-kit.com/component/carousel |

### Chat

| Job | Open |
| --- | --- |
| Chat bubble | https://gpui-kit.com/component/bubble |
| Chat message | https://gpui-kit.com/component/message |
| Chat transcript | https://gpui-kit.com/component/message-scroller |
| Status line | https://gpui-kit.com/component/marker |
| File attachment | https://gpui-kit.com/component/attachment |

### Chrome

| Job | Open |
| --- | --- |
| Title bar | https://gpui-kit.com/component/title-bar |
| Status bar | https://gpui-kit.com/component/status-bar |
| Settings | https://gpui-kit.com/component/settings |
| Icon | https://gpui-kit.com/component/icon |
| Avatar | https://gpui-kit.com/component/avatar |
| Badge | https://gpui-kit.com/component/badge |
| Tag | https://gpui-kit.com/component/tag |
| Keyboard shortcut | https://gpui-kit.com/component/kbd |
| Copy button | https://gpui-kit.com/component/clipboard |
| Rating | https://gpui-kit.com/component/rating |
| Undo and redo | https://gpui-kit.com/base/history |
| Motion | https://gpui-kit.com/base/motion |
| Text selection | https://gpui-kit.com/base/text-selection |

[All styled pages](#component) · [All base pages](#base) · [Directory](README.md)

## Component

Styled library. 75 pages.

| Page | What it is | URL |
| --- | --- | --- |
| Accordion | The accordion uses collapse internally to make it collapsible. | https://gpui-kit.com/component/accordion |
| Alert | Displays a callout for user attention. | https://gpui-kit.com/component/alert |
| AlertDialog | A modal dialog that interrupts the user with important content and expects a response. | https://gpui-kit.com/component/alert-dialog |
| Attachment | A composable file and media attachment surface with lifecycle states, previews, and actions. | https://gpui-kit.com/component/attachment |
| Avatar | Displays a user avatar image with fallback options. | https://gpui-kit.com/component/avatar |
| Badge | A red dot that indicates the number of unread messages, status, or other notifications. | https://gpui-kit.com/component/badge |
| Bubble | A composable chat surface for text, rich content, and reaction controls. | https://gpui-kit.com/component/bubble |
| Button | Displays a button or a component that looks like a button. | https://gpui-kit.com/component/button |
| Calendar | A flexible calendar component for displaying months, navigating dates, and selecting single dates or date ranges. | https://gpui-kit.com/component/calendar |
| Carousel | A composable carousel for browsing related content. | https://gpui-kit.com/component/carousel |
| Chart | Beautiful charts and graphs for data visualization including line, bar, area, pie, radar, candlestick, and sankey charts. | https://gpui-kit.com/component/chart |
| Checkbox | A control that allows the user to toggle between checked and not checked. | https://gpui-kit.com/component/checkbox |
| Clipboard | A button component that helps you copy text or other content to your clipboard. | https://gpui-kit.com/component/clipboard |
| Collapsible | An interactive element which expands/collapses. | https://gpui-kit.com/component/collapsible |
| ColorPicker | A comprehensive color selection interface with support for multiple color formats, presets, and alpha channel. | https://gpui-kit.com/component/color-picker |
| Combobox | An autocomplete input paired with a searchable dropdown list. | https://gpui-kit.com/component/combobox |
| Command | A command palette - a filtered list of commands and quick actions. | https://gpui-kit.com/component/command |
| Components | Browse more than 60 production-ready Rust UI components for forms, navigation, data, feedback, and desktop application layouts. | https://gpui-kit.com/component |
| DataTable | High-performance data table with virtual scrolling, sorting, filtering, and column management. | https://gpui-kit.com/component/data-table |
| DatePicker | A date picker component for selecting single dates or date ranges with calendar interface. | https://gpui-kit.com/component/date-picker |
| DescriptionList | Use to display details with a tidy layout for key-value pairs. | https://gpui-kit.com/component/description-list |
| Dialog | A dialog dialog for displaying content in a layer above the app. | https://gpui-kit.com/component/dialog |
| Dock | Production-ready dock layouts with styled tabs, split panes, edge docks, and persistent state. | https://gpui-kit.com/component/dock |
| DropdownButton | A DropdownButton is a combination of a button and a trigger button. It allows us to display a dropdown menu when the trigger is clicked, but the left Button can still respond to independent events. | https://gpui-kit.com/component/dropdown_button |
| Editor | Source-code editor with syntax highlighting, gutter, folding, and decorations. | https://gpui-kit.com/component/editor |
| Empty | Composable empty states with media, text, actions, and custom content. | https://gpui-kit.com/component/empty |
| Focus Trap | A utility element that traps keyboard focus within a container, preventing Tab navigation from escaping. | https://gpui-kit.com/component/focus-trap |
| Form | Flexible form container with support for field layout, validation, and multi-column layouts. | https://gpui-kit.com/component/form |
| GroupBox | A styled container element with an optional title to group related content together. | https://gpui-kit.com/component/group-box |
| HoverCard | A floating overlay that displays rich content when hovering over a trigger element. | https://gpui-kit.com/component/hover-card |
| Icon | Display SVG icons with various sizes, colors, and transformations. | https://gpui-kit.com/component/icon |
| Image | A flexible image display component with loading states, fallbacks, and responsive sizing options. | https://gpui-kit.com/component/image |
| Input | Text input component with validation, masking, and various features. | https://gpui-kit.com/component/input |
| Input Group | Combine inputs and textareas with text, icons, buttons, and toolbars. | https://gpui-kit.com/component/input-group |
| Kbd | Displays keyboard shortcuts with platform-specific formatting. | https://gpui-kit.com/component/kbd |
| Label | Text labels for form elements with highlighting and styling options. | https://gpui-kit.com/component/label |
| List | A flexible list component that displays a series of items with support for sections, search, selection, and infinite scrolling. | https://gpui-kit.com/component/list |
| Marker | A compact composable row for conversation status, notifications, loading, and separators. | https://gpui-kit.com/component/marker |
| Menu | Context menus and popup menus with support for icons, shortcuts, submenus, and various menu item types. | https://gpui-kit.com/component/menu |
| Message | Compose sender identity, metadata, rich content, and actions into an aligned chat message. | https://gpui-kit.com/component/message |
| MessageScroller | A virtualized message list with tail following, history insertion, unread navigation, and customizable jump controls. | https://gpui-kit.com/component/message-scroller |
| Notification | Display toast notifications that appear at the top right of the window with auto-dismiss functionality. | https://gpui-kit.com/component/notification |
| NumberInput | Number input component with increment/decrement controls and numeric formatting. | https://gpui-kit.com/component/number-input |
| OtpInput | One-time password input component with multiple fields, auto-focus, and paste handling. | https://gpui-kit.com/component/otp-input |
| Pagination | Pagination with page navigation, next and previous links. | https://gpui-kit.com/component/pagination |
| Plot | A low-level plotting library for creating custom charts and data visualizations. | https://gpui-kit.com/component/plot |
| Popover | A floating overlay that displays rich content relative to a trigger element. | https://gpui-kit.com/component/popover |
| Progress | Displays an indicator showing the completion progress of a task, typically displayed as a progress bar or circular indicator. | https://gpui-kit.com/component/progress |
| Radio | A set of checkable buttons-known as radio buttons-where no more than one of the buttons can be checked at a time. | https://gpui-kit.com/component/radio |
| Rating | A simple interactive star rating component. | https://gpui-kit.com/component/rating |
| Resizable | A flexible panel layout system with draggable resize handles and adjustable panels. | https://gpui-kit.com/component/resizable |
| Root View | Use the Root view to enable themes, notifications, dialogs, and other GPUI Component features in a window. | https://gpui-kit.com/component/root |
| Scrollable | Scrollable container with custom scrollbars, scroll tracking, and virtualization support. | https://gpui-kit.com/component/scrollable |
| Select | Displays a list of options for the user to pick from-triggered by a button. | https://gpui-kit.com/component/select |
| Settings | A settings UI with grouped setting items and pages. | https://gpui-kit.com/component/settings |
| Sheet | A sliding panel that appears from the edges of the screen for displaying content. | https://gpui-kit.com/component/sheet |
| Shimmer | Theme-aware loading text with configurable sweep timing, spread, direction, and reduced-motion behavior. | https://gpui-kit.com/component/shimmer |
| Sidebar | A composable, themeable and customizable sidebar component for navigation and content organization. | https://gpui-kit.com/component/sidebar |
| Skeleton | Use to show a placeholder while content is loading. | https://gpui-kit.com/component/skeleton |
| Slider | A control that allows the user to select values from a range using a draggable thumb. | https://gpui-kit.com/component/slider |
| Spinner | Displays an animated loading showing the completion progress of a task. | https://gpui-kit.com/component/spinner |
| StatusBar | A horizontal status bar with left, center, and right regions, usually placed at the bottom of a window or pane. | https://gpui-kit.com/component/status-bar |
| Stepper | A step-by-step progress for users to navigate through a series of steps or stages. | https://gpui-kit.com/component/stepper |
| Switch | A control that allows the user to toggle between checked and not checked. | https://gpui-kit.com/component/switch |
| Table | A basic table component for directly rendering tabular data. | https://gpui-kit.com/component/table |
| Tabs | A set of layered sections of content-known as tab panels-that are displayed one at a time. | https://gpui-kit.com/component/tabs |
| Tag | A short item that can be used to categorize or label content. | https://gpui-kit.com/component/tag |
| Textarea | Multi-line text input with fixed rows, soft wrapping, and auto-grow. | https://gpui-kit.com/component/textarea |
| TextView | Renders Markdown and HTML text with optional custom Markdown plugins. | https://gpui-kit.com/component/text-view |
| Theme | Customize colors, typography, radii, and light or dark appearance with the GPUI Component theme system. | https://gpui-kit.com/component/theme |
| TitleBar | A custom window title bar component with window controls and custom content support. | https://gpui-kit.com/component/title-bar |
| Toggle | A button-style toggle component for binary on/off or selected states. | https://gpui-kit.com/component/toggle |
| Tooltip | Display helpful information on hover or focus, with support for keyboard shortcuts and custom content. | https://gpui-kit.com/component/tooltip |
| Tree | A hierarchical tree view component for displaying and navigating tree-structured data. | https://gpui-kit.com/component/tree |
| VirtualList | High-performance virtualized list component for rendering large datasets with variable item sizes. | https://gpui-kit.com/component/virtual-list |

## Base

Unstyled behavior. 47 pages.

| Page | What it is | URL |
| --- | --- | --- |
| Accordion | A disclosure group composed from independently styleable header, trigger, and panel parts. | https://gpui-kit.com/base/primitives/accordion |
| Alert Dialog | A modal confirmation surface for actions that need an explicit decision. | https://gpui-kit.com/base/primitives/alert-dialog |
| Avatar | An image with composable fallback content for a person or entity. | https://gpui-kit.com/base/primitives/avatar |
| Button | An unstyled, accessible pressable with semantic state and keyboard activation. | https://gpui-kit.com/base/primitives/button |
| Calendar | A state-driven date grid with selection matchers and custom item rendering. | https://gpui-kit.com/base/primitives/calendar |
| Checkbox | A controlled tri-state check control with a separately styled indicator. | https://gpui-kit.com/base/primitives/checkbox |
| Collapsible | A composable region that shows or hides content without prescribing its trigger styling. | https://gpui-kit.com/base/primitives/collapsible |
| Color Picker | State and interaction foundations for selecting colors in a custom picker UI. | https://gpui-kit.com/base/primitives/color-picker |
| Combobox | A text input paired with keyboard-navigable suggestions and selection behavior. | https://gpui-kit.com/base/primitives/combobox |
| Date Picker | A focus-aware date input that composes calendar behavior with a popup. | https://gpui-kit.com/base/primitives/date-picker |
| Dialog | A composable modal surface with focus management, backdrop, title, and close parts. | https://gpui-kit.com/base/primitives/dialog |
| Dock | A dockable workspace - splits, tab groups, and edge docks - whose layout is pure data and whose appearance is entirely yours. | https://gpui-kit.com/base/dock |
| Editor | An unstyled source-code editor with language, gutter, folding, and decoration support. | https://gpui-kit.com/base/primitives/editor |
| Getting Started | Install, initialize, and render your first gpui-base control. | https://gpui-kit.com/base/getting-started |
| GPUI Base | The unstyled behavior and infrastructure foundation of GPUI Kit, the Rust desktop framework. | https://gpui-kit.com/base |
| History | Browser-style navigation trails and grouped undo/redo transactions for application state. | https://gpui-kit.com/base/history |
| Hover Card | A delayed floating card associated with a pointer or keyboard trigger. | https://gpui-kit.com/base/primitives/hover-card |
| Input | An unstyled single-line text input with masking, validation, and number stepping. | https://gpui-kit.com/base/primitives/input |
| Link | An accessible link-like control with application-defined styling. | https://gpui-kit.com/base/primitives/link |
| Motion | Typed transitions, springs, keyframes, presence, stagger, and reduced-motion behavior in gpui-base. | https://gpui-kit.com/base/motion |
| Nav Stack | A navigation stack of views with push, pop, forward, and replace, and an animatable transition lifecycle. | https://gpui-kit.com/base/primitives/nav-stack |
| Number Input | A numeric input with reusable increment, decrement, and step behavior. | https://gpui-kit.com/base/primitives/number-input |
| OTP Input | A multi-cell one-time-code input driven by a shared text state. | https://gpui-kit.com/base/primitives/otp-input |
| Pagination | A controlled page navigator with explicit current and total page state. | https://gpui-kit.com/base/primitives/pagination |
| Popover | An anchored floating surface with controlled or internally managed open state. | https://gpui-kit.com/base/primitives/popover |
| Popup | A low-level trigger and anchored floating-content host. | https://gpui-kit.com/base/primitives/popup |
| Primitives | The complete catalog of user-facing gpui-base primitives. | https://gpui-kit.com/base/primitives |
| Progress | Composable track and indicator parts for reporting task completion. | https://gpui-kit.com/base/primitives/progress |
| Radio | A controlled single-choice item with selectable and disabled semantics. | https://gpui-kit.com/base/primitives/radio |
| Radio Group | Groups radio items and provides keyboard navigation for a single selection. | https://gpui-kit.com/base/primitives/radio-group |
| Resizable | Panel groups and resize handles for user-adjustable split layouts. | https://gpui-kit.com/base/primitives/resizable |
| Scrollbar | Add a styled, animated scrollbar to GPUI scroll views, lists, and custom viewports. | https://gpui-kit.com/base/primitives/scrollbar |
| Select | A button-like selection control backed by an anchored, keyboard-navigable popup. | https://gpui-kit.com/base/primitives/select |
| Sheet | A modal surface that enters from an edge while managing dismissal and focus. | https://gpui-kit.com/base/primitives/sheet |
| Slider | A state-driven range input with independently styleable track, indicator, and thumb. | https://gpui-kit.com/base/primitives/slider |
| Switch | A controlled on/off control with separately styleable track and thumb. | https://gpui-kit.com/base/primitives/switch |
| Table | Semantic table primitives for composing headers, bodies, rows, and cells. | https://gpui-kit.com/base/primitives/table |
| Tabs | A tab list and accessible tab controls with controlled selection. | https://gpui-kit.com/base/primitives/tabs |
| Text Selection | Add native window-level text selection to plain text and custom GPUI participants. | https://gpui-kit.com/base/text-selection |
| Textarea | An unstyled multi-line text field with fixed rows or auto-grow behavior. | https://gpui-kit.com/base/primitives/textarea |
| TextView | Render selectable Markdown and HTML directly with gpui-base. | https://gpui-kit.com/base/text-view |
| Toast | A managed, animated stack of temporary status messages. | https://gpui-kit.com/base/primitives/toast |
| Toggle | A controlled two-state pressable for persistent choices such as formatting. | https://gpui-kit.com/base/primitives/toggle |
| Toggle Group | Coordinates a set of toggle controls as a single- or multiple-selection group. | https://gpui-kit.com/base/primitives/toggle-group |
| Tooltip | A delayed, positioned description associated with a trigger element. | https://gpui-kit.com/base/primitives/tooltip |
| Tree | A virtualized hierarchical list with explicit expansion and selection state. | https://gpui-kit.com/base/primitives/tree |
| VirtualList | Render a hundred thousand differently sized rows by drawing only the ones on screen. | https://gpui-kit.com/base/virtual-list |

## Shell

JavaScript on GPUI. 15 pages.

| Page | What it is | URL |
| --- | --- | --- |
| API Reference | Every name a script can import or reach - the four built-in modules, the cx and window globals, and the element methods that are not styles. | https://gpui-kit.com/shell/api |
| Capabilities | The default-deny model, the fs / storage / clipboard / process surface, where storage lives, and what the sandbox withholds. | https://gpui-kit.com/shell/capabilities |
| Dependencies | Shell packages - what makes a Git repository one, and how a manifest names, selects, fetches and imports it, down to what an editor sees. | https://gpui-kit.com/shell/dependencies |
| Dock and Panels | A dockable layout drawn entirely by script - panels that survive a restart, chrome you draw yourself, and commands instead of callbacks. | https://gpui-kit.com/shell/dock |
| Elements | Constructors, composition with child / children / when, and why an element description can only be used once. | https://gpui-kit.com/shell/elements |
| Examples | Complete standalone and embedded applications, including retained state, HostModule registrations, and native motion. | https://gpui-kit.com/shell/examples |
| Getting Started | Add the runtime to a Rust application, write the script it loads, and check that script without opening a window. | https://gpui-kit.com/shell/getting-started |
| GPUI Shell | Makes a Rust GPUI application extensible in JavaScript, rendered by GPUI itself - no WebView, no DOM. Plugins first, standalone script applications second. | https://gpui-kit.com/shell |
| Hosting | The Rust side in full - runtime lifetime, mounting script Views, refreshing them from host state, metrics, exit requests and hot-reload. | https://gpui-kit.com/shell/hosting |
| HostModule | How a host lends its own Rust to a script - registration, the import that reaches it, the plain-data boundary, and the rules a Host function runs under. | https://gpui-kit.com/shell/host-module |
| Overlays | Dialogs, the sheet and toasts, their stacking and dismissal order, and why they may only be opened from an event. | https://gpui-kit.com/shell/overlays |
| Performance | What a script costs once frame rate stops being the variable - invalidation against description size, the View as the boundary that bounds both, and the two failures FPS cannot tell apart. | https://gpui-kit.com/shell/performance |
| State and Views | Views, init and render, cx.notify(), retained input state, and asynchronous work. | https://gpui-kit.com/shell/state |
| Styling | The fluent style surface, length and colour grammars, semantic theme tokens, and hover / active / focus styles. | https://gpui-kit.com/shell/styling |
| The Engine Seam | QuickJS behind one internal interface, why the seam exists, and the three measurements that tell script cost apart from frame cost. | https://gpui-kit.com/shell/engine |

## Docs

Setup and platform. 14 pages.

| Page | What it is | URL |
| --- | --- | --- |
| Coding Guides | Architecture and coding conventions for maintainable GPUI Kit applications | https://gpui-kit.com/docs/coding-guides |
| Comparison | How GPUI Kit compares with Iced, egui and Qt 6. | https://gpui-kit.com/docs/comparison |
| Context | Learn about the Window and Context in GPUI. | https://gpui-kit.com/docs/context |
| Design Guides | Product and interaction design guidance for GPUI Kit applications | https://gpui-kit.com/docs/design-guides |
| ElementId | To introduce the ElementId concept in GPUI. | https://gpui-kit.com/docs/element_id |
| Fonts | System fonts, theme fonts, per-element overrides, and bundling custom fonts. | https://gpui-kit.com/docs/fonts |
| FPS Monitor | Read the gpui-fps HUD - what MAX FPS is, why it is derived rather than counted, and what each row measures. | https://gpui-kit.com/docs/fps |
| Getting Started | Learn how to set up and use GPUI Component in your project | https://gpui-kit.com/docs/getting-started |
| GPUI Kit | A comprehensive Rust framework for building fantastic, high-performance desktop applications with GPUI. | https://gpui-kit.com/docs |
| I18n | Add or override GPUI Component translations from your application. | https://gpui-kit.com/docs/i18n |
| Icons & Assets | Configure bundled icons and custom assets for GPUI Component applications. | https://gpui-kit.com/docs/assets |
| Installation | Install GPUI Kit and prepare the system dependencies required to build Rust desktop applications on macOS, Windows, and Linux. | https://gpui-kit.com/docs/installation |
| Mobile | Build an iOS application or embed GPUI Kit in a Swift UIKit container with the experimental gpui-pre-mobile platform. | https://gpui-kit.com/docs/mobile |
| Testing | Test GPUI Kit applications and GPUI behavior with Rust unit tests, TestAppContext, native UI interactions, layout assertions and CI. | https://gpui-kit.com/docs/test |
