/* =================================
   ENHANCED EDIT MODE STYLES - 3 STATES SYSTEM
   Optimized for PC only, minimal animations
   ================================= */

/* =================================
   EDIT MODE TOGGLE BUTTON
   ================================= */

.edit-mode-toggle {
    position: fixed;
    top: 70px;
    left: 20px;
    z-index: 1000;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
    transition: all 0.3s ease;
}

.edit-mode-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
}

.edit-mode-toggle.active {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

/* Dark mode styles */
[data-theme="dark"] .edit-mode-toggle {
    background: linear-gradient(135deg, #50fa7b 0%, #5af78e 100%);
    color: #0a0a0a;
    box-shadow: 0 4px 15px rgba(80, 250, 123, 0.4);
}

[data-theme="dark"] .edit-mode-toggle.active {
    background: linear-gradient(135deg, #ff5555 0%, #ff6b6b 100%);
    color: white;
}

/* =================================
   EDIT VIEW HEADER
   ================================= */

.edit-view-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    z-index: 999;
    border-bottom: 2px solid #4ecdc4;
}

[data-theme="dark"] .edit-view-header {
    background: rgba(10, 10, 10, 0.98);
    box-shadow: 0 2px 20px rgba(255, 107, 53, 0.2);
    border-bottom: 2px solid #ff6b35;
}

.edit-view-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
}

.edit-controls-left,
.edit-controls-center,
.edit-controls-right {
    display: flex;
    align-items: center;
    gap: 15px;
}

.edit-controls-center {
    flex: 1;
    justify-content: center;
}

/* Header buttons */
.btn-back-gallery,
.btn-enter-select,
.btn-batch-upload {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'InterVariable','Inter', sans-serif;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-back-gallery {
    background: #6b7280;
}

.btn-back-gallery:hover {
    background: #4b5563;
    transform: translateY(-1px);
}

.btn-enter-select {
    background: #8b5cf6;
}

.btn-enter-select:hover {
    background: #7c3aed;
    transform: translateY(-1px);
}

.btn-batch-upload {
    background: #10b981;
}

.btn-batch-upload:hover {
    background: #059669;
    transform: translateY(-1px);
}

.total-counter {
    font-family: 'InterVariable','Inter', sans-serif;
    font-weight: 600;
    color: #4b5563;
    padding: 8px 16px;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 6px;
    border: 1px solid rgba(59, 130, 246, 0.2);
}

[data-theme="dark"] .total-counter {
    color: #8be9fd;
    background: rgba(139, 233, 253, 0.1);
    border-color: rgba(139, 233, 253, 0.2);
}

/* =================================
   EDIT SELECT HEADER
   ================================= */

.edit-select-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    z-index: 999;
    border-bottom: 2px solid #8b5cf6;
}

[data-theme="dark"] .edit-select-header {
    background: rgba(10, 10, 10, 0.98);
    box-shadow: 0 2px 20px rgba(139, 92, 246, 0.2);
    border-bottom: 2px solid #bd93f9;
}

.edit-select-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
}

.btn-cancel-select,
.btn-select-all {
    background: #ef4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'InterVariable','Inter', sans-serif;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-cancel-select:hover {
    background: #dc2626;
    transform: translateY(-1px);
}

.btn-select-all {
    background: #3b82f6;
}

.btn-select-all:hover {
    background: #2563eb;
    transform: translateY(-1px);
}

.selection-counter {
    font-family: 'InterVariable','Inter', sans-serif;
    font-weight: 600;
    color: #4b5563;
    padding: 8px 16px;
    background: rgba(139, 92, 246, 0.1);
    border-radius: 6px;
    border: 1px solid rgba(139, 92, 246, 0.2);
}

[data-theme="dark"] .selection-counter {
    color: #bd93f9;
    background: rgba(189, 147, 249, 0.1);
    border-color: rgba(189, 147, 249, 0.2);
}

/* =================================
   ACTION BAR (BOTTOM)
   ================================= */

.edit-action-bar {
    position: fixed;
    bottom: -100px;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    transition: bottom 0.3s ease;
    border-top: 2px solid #8b5cf6;
}

.edit-action-bar.visible {
    bottom: 0;
}

[data-theme="dark"] .edit-action-bar {
    background: rgba(10, 10, 10, 0.98);
    box-shadow: 0 -4px 30px rgba(139, 92, 246, 0.3);
    border-top: 2px solid #bd93f9;
}

.action-btn {
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    font-family: 'InterVariable','Inter', sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-delete-selected {
    background: #ef4444;
    color: white;
}

.btn-delete-selected:hover {
    background: #dc2626;
    transform: translateY(-1px);
}

.btn-move-top {
    background: #6366f1;
    color: white;
}

.btn-move-top:hover {
    background: #4f46e5;
    transform: translateY(-1px);
}

.btn-move-bottom {
    background: #8b5cf6;
    color: white;
}

.btn-move-bottom:hover {
    background: #7c3aed;
    transform: translateY(-1px);
}

/* =================================
   GALLERY STATES
   ================================= */

/* Normal mode - default gallery styles */
.artwork {
    width: calc(20% - 16px);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Edit View Mode - small thumbnails, no info */
.edit-view-mode .artwork {
    width: 150px !important;
    margin-bottom: 20px;
    transition: none !important;
}

.edit-view-mode .artwork-container {
    height: 150px;
}

.edit-view-mode .artwork-container img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    transition: none !important;
    transform: none !important;
}

.edit-view-mode .artwork-info {
    display: none !important;
}

.edit-view-mode .artwork-actions {
    display: none !important;
}

.edit-view-mode .artwork:hover {
    transform: none !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
}

/* Edit Select Mode - show checkboxes */
.edit-select-mode .artwork-checkbox {
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 4px;
}

.edit-select-mode .artwork-checkbox:checked {
    accent-color: #3b82f6;
}

/* Selected artwork overlay */
.edit-select-mode .artwork.selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(59, 130, 246, 0.2);
    pointer-events: none;
    border: 2px solid #3b82f6;
    border-radius: 8px;
}

[data-theme="dark"] .edit-select-mode .artwork.selected::after {
    background: rgba(80, 250, 123, 0.3);
    border-color: #50fa7b;
}

/* Hide checkbox by default */
.artwork-checkbox {
    display: none;
    opacity: 0;
    visibility: hidden;
}

/* Disable lightbox in select mode */
.edit-select-mode .artwork {
    cursor: pointer;
}

.edit-select-mode .artwork img {
    pointer-events: none;
}

/* =================================
   BATCH UPLOAD MODAL (REUSED)
   ================================= */

.batch-upload-modal {
    display: none;
    position: fixed;
    z-index: 1001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.batch-upload-content {
    position: relative;
    background-color: var(--background-color);
    margin: 5% auto;
    padding: 30px;
    border-radius: 12px;
    width: 80%;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
}

.batch-drop-zone {
    border: 3px dashed var(--border-color);
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.02);
}

.batch-drop-zone:hover {
    border-color: var(--button-color);
    background: rgba(0, 0, 0, 0.05);
}

.batch-drop-zone.dragover {
    background: rgba(78, 205, 196, 0.1);
    border-color: #4ecdc4;
}

.batch-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.batch-preview-item {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.batch-preview-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.batch-preview-item .remove-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
}

.batch-upload-progress {
    margin-top: 20px;
}

.progress-item {
    margin-bottom: 10px;
}

.progress-bar {
    width: 100%;
    height: 20px;
    background: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
    width: 0%;
    transition: width 0.3s ease;
}

/* =================================
   PERFORMANCE OPTIMIZATIONS
   ================================= */

/* Disable animations in edit modes */
.edit-view-mode .artwork,
.edit-select-mode .artwork {
    will-change: auto !important;
    animation: none !important;
    transition: none !important;
}

.edit-view-mode .artwork:hover,
.edit-select-mode .artwork:hover {
    transform: none !important;
    animation: none !important;
}

/* Contain layout changes */
.edit-view-mode .gallery,
.edit-select-mode .gallery {
    contain: layout style;
}

/* Force GPU layer for smooth interactions */
.edit-view-mode .artwork-container,
.edit-select-mode .artwork-container {
    transform: translateZ(0);
    backface-visibility: hidden;
}

/* =================================
   ACCESSIBILITY
   ================================= */

.btn-back-gallery:focus,
.btn-enter-select:focus,
.btn-batch-upload:focus,
.btn-cancel-select:focus,
.btn-select-all:focus,
.action-btn:focus {
    outline: 2px solid var(--button-color);
    outline-offset: 2px;
}

.artwork-checkbox:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

/* =================================
   RESPONSIVE GRID ADJUSTMENTS
   ================================= */

/* Ensure proper grid layout in edit modes */
.edit-view-mode .gallery,
.edit-select-mode .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: flex-start;
}

/* Thumbnail hover effects in edit view (subtle) */
.edit-view-mode .artwork:hover {
    opacity: 0.8;
}

.edit-select-mode .artwork:hover {
    opacity: 0.9;
}

/* Selected item indication */
.edit-select-mode .artwork.selected {
    opacity: 1;
}

/* =================================
   FLOATING BUTTONS MANAGEMENT
   ================================= */

/* Hide floating buttons in edit modes */
.edit-view-mode .theme-toggle-container,
.edit-view-mode .metadata-viewer-toggle,
.edit-view-mode .fab,
.edit-select-mode .theme-toggle-container,
.edit-select-mode .metadata-viewer-toggle,
.edit-select-mode .fab {
    display: none !important;
}

/* Keep edit toggle visible but adjust position */
.edit-view-mode .edit-mode-toggle,
.edit-select-mode .edit-mode-toggle {
    top: 20px;
    left: 20px;
}

/* =================================
   BODY PADDING ADJUSTMENTS
   ================================= */

.edit-view-mode,
.edit-select-mode {
    padding-top: 80px;
}

/* =================================
   DARK MODE SPECIFIC STYLES
   ================================= */

[data-theme="dark"] .btn-back-gallery,
[data-theme="dark"] .btn-enter-select,
[data-theme="dark"] .btn-batch-upload,
[data-theme="dark"] .btn-cancel-select,
[data-theme="dark"] .btn-select-all {
    background: linear-gradient(135deg, rgba(80, 250, 123, 0.9) 0%, rgba(139, 233, 253, 0.9) 100%);
    color: #0a0a0a;
    font-weight: 600;
}

[data-theme="dark"] .btn-delete-selected {
    background: linear-gradient(135deg, #ff5555 0%, #ff6b6b 100%);
    color: white;
}

[data-theme="dark"] .btn-move-top,
[data-theme="dark"] .btn-move-bottom {
    background: linear-gradient(135deg, #bd93f9 0%, #ff79c6 100%);
    color: #0a0a0a;
    font-weight: 600;
}

/* =================================
   SCROLLBAR STYLING
   ================================= */

[data-theme="dark"] .edit-view-mode ::-webkit-scrollbar,
[data-theme="dark"] .edit-select-mode ::-webkit-scrollbar {
    width: 8px;
}

[data-theme="dark"] .edit-view-mode ::-webkit-scrollbar-track,
[data-theme="dark"] .edit-select-mode ::-webkit-scrollbar-track {
    background: #0a0a0a;
}

[data-theme="dark"] .edit-view-mode ::-webkit-scrollbar-thumb,
[data-theme="dark"] .edit-select-mode ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #bd93f9, #ff79c6);
    border-radius: 4px;
}

/* =================================
   TRANSITIONS FOR SMOOTH STATE CHANGES
   ================================= */

.edit-view-header,
.edit-select-header,
.edit-action-bar {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.artwork-checkbox {
    transition: opacity 0.2s ease, visibility 0.2s ease;
}

/* =================================
   ERROR STATES AND LOADING
   ================================= */

.edit-mode-loading {
    opacity: 0.5;
    pointer-events: none;
}

.edit-mode-error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid #ef4444;
    color: #dc2626;
    padding: 10px;
    border-radius: 6px;
    margin: 10px 0;
}
