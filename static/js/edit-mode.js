// ============================================================================
// ENHANCED EDIT MODE MANAGER - 3 STATES SYSTEM (SIMPLIFIED UX)
// ============================================================================
//
// States:
// 1. NORMAL - Gallery bình thường với large cards, có Edit Mode button
// 2. EDIT_VIEW - Thumbnails nhỏ, có lightbox, có Back to Gallery button  
// 3. EDIT_SELECT - Có checkbox, không lightbox, có Cancel Select button
//
// Clean UX Flow:
// Normal ──[Edit Mode]──→ Edit View ──[Select]──→ Edit Select
//   ↑                        ↑                     │
//   └────[Back to Gallery]───┘       [Cancel]─────┘
//
// ============================================================================

class EditModeManager {
    constructor() {
        // State definitions
        this.MODES = {
            NORMAL: 'normal',
            EDIT_VIEW: 'edit-view', 
            EDIT_SELECT: 'edit-select'
        };
        
        this.currentMode = this.MODES.NORMAL;
        this.selectedItems = new Set();
        
        // UI Elements
        this.toggleButton = null;
        this.editViewHeader = null;
        this.editSelectHeader = null;
        this.actionBar = null;
        this.floatingButtons = [];
        
        // State tracking
        this.originalBodyPadding = '';
        
        this.init();
    }
    
    init() {
        console.log('🔧 Initializing Enhanced Edit Mode Manager...');
        
        // Create UI elements
        this.createEditModeToggle();
        this.createEditViewHeader();
        this.createEditSelectHeader();
        this.createActionBar();
        this.createBatchUploadModal();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Find floating buttons
        this.findFloatingButtons();
        
        // Check restore state
        if (sessionStorage.getItem('restoreEditMode') === 'true') {
            sessionStorage.removeItem('restoreEditMode');
            setTimeout(() => this.switchToMode(this.MODES.EDIT_VIEW), 100);
        }
        
        console.log('✅ Enhanced Edit Mode Manager initialized');
    }
    
    // ========================================================================
    // UI CREATION METHODS
    // ========================================================================
    
    createEditModeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'edit-mode-button'; // Changed from toggle to button
        toggle.innerHTML = '<i class="fa-light fa-pen-to-square"></i>';
        toggle.title = 'Enter Edit Mode';
        toggle.setAttribute('aria-label', 'Enter Edit Mode');
        
        document.body.appendChild(toggle);
        this.toggleButton = toggle; // Note: still called toggleButton for code compatibility
    }
    
    createEditViewHeader() {
        const header = document.createElement('div');
        header.className = 'edit-view-header';
        header.style.display = 'none';
        header.innerHTML = `
            <div class="edit-view-controls">
                <div class="edit-controls-left">
                    <button class="btn-back-gallery">
                        <i class="fas fa-arrow-left"></i> Back to Gallery
                    </button>
                </div>
                <div class="edit-controls-center">
                    <button class="btn-enter-select">
                        <i class="fas fa-check-square"></i> Select
                    </button>
                    <button class="btn-batch-upload">
                        <i class="fas fa-plus"></i> Batch Upload
                    </button>
                </div>
                <div class="edit-controls-right">
                    <span class="total-counter">
                        <i class="fas fa-images"></i> <span id="total-count">0</span> items
                    </span>
                </div>
            </div>
        `;
        
        document.body.appendChild(header);
        this.editViewHeader = header;
    }
    
    createEditSelectHeader() {
        const header = document.createElement('div');
        header.className = 'edit-select-header';
        header.style.display = 'none';
        header.innerHTML = `
            <div class="edit-select-controls">
                <div class="edit-controls-left">
                    <button class="btn-cancel-select">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
                <div class="edit-controls-right">
                    <button class="btn-select-all">
                        <i class="fas fa-check-square"></i> Select All
                    </button>
                    <span class="selection-counter">
                        <i class="fas fa-chart-bar"></i> Selected: <span id="selected-count">0</span>/<span id="select-total-count">0</span>
                    </span>
                </div>
            </div>
        `;
        
        document.body.appendChild(header);
        this.editSelectHeader = header;
    }
    
    createActionBar() {
        const actionBar = document.createElement('div');
        actionBar.className = 'edit-action-bar';
        actionBar.innerHTML = `
            <button class="action-btn btn-delete-selected">
                <i class="fas fa-trash"></i> Delete Selected
            </button>
            <button class="action-btn btn-move-top">
                <i class="fas fa-arrow-up"></i> Move to Top
            </button>
            <button class="action-btn btn-move-bottom">
                <i class="fas fa-arrow-down"></i> Move to Bottom
            </button>
        `;
        
        document.body.appendChild(actionBar);
        this.actionBar = actionBar;
    }
    
    createBatchUploadModal() {
        const modal = document.createElement('div');
        modal.className = 'batch-upload-modal';
        modal.innerHTML = `
            <div class="batch-upload-content">
                <span class="close">&times;</span>
                <h2>Batch Upload Images</h2>
                <div class="batch-drop-zone">
                    <p><i class="fas fa-cloud-upload-alt fa-3x"></i></p>
                    <p>Drag & drop multiple images here</p>
                    <p>or click to select files</p>
                    <input type="file" id="batch-file-input" multiple accept="image/*" hidden>
                </div>
                <div class="batch-preview-grid" id="batch-preview-grid"></div>
                <div class="batch-upload-progress" id="batch-upload-progress" style="display: none;"></div>
                <div class="button-group" style="margin-top: 20px;">
                    <button class="btn-submit" id="start-batch-upload" style="display: none;">
                        Upload All Images
                    </button>
                    <button class="btn-cancel" id="cancel-batch-upload">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.batchUploadModal = modal;
        this.batchFiles = [];
    }
    
    findFloatingButtons() {
        // Find all floating buttons that should be hidden in edit modes
        this.floatingButtons = [
            document.querySelector('.theme-toggle-container'),
            document.querySelector('.metadata-viewer-toggle'),
            document.querySelector('.fab'), // Add artwork button
            document.querySelector('.edit-mode-button') // Will be handled separately
        ].filter(Boolean);
    }
    
    // ========================================================================
    // EVENT LISTENERS SETUP
    // ========================================================================
    
    setupEventListeners() {
        // Edit Mode button - simple entry point
        this.toggleButton.addEventListener('click', () => this.handleToggleClick());
        
        // Edit View Header buttons
        this.editViewHeader.querySelector('.btn-back-gallery').addEventListener('click', () => {
            this.switchToMode(this.MODES.NORMAL);
        });
        
        this.editViewHeader.querySelector('.btn-enter-select').addEventListener('click', () => {
            this.switchToMode(this.MODES.EDIT_SELECT);
        });
        
        this.editViewHeader.querySelector('.btn-batch-upload').addEventListener('click', () => {
            this.openBatchUpload();
        });
        
        // Edit Select Header buttons
        this.editSelectHeader.querySelector('.btn-cancel-select').addEventListener('click', () => {
            this.switchToMode(this.MODES.EDIT_VIEW);
        });
        
        this.editSelectHeader.querySelector('.btn-select-all').addEventListener('click', () => {
            this.toggleSelectAll();
        });
        
        // Action Bar buttons
        this.actionBar.querySelector('.btn-delete-selected').addEventListener('click', () => {
            this.deleteSelected();
        });
        
        this.actionBar.querySelector('.btn-move-top').addEventListener('click', () => {
            this.moveSelectedToTop();
        });
        
        this.actionBar.querySelector('.btn-move-bottom').addEventListener('click', () => {
            this.moveSelectedToBottom();
        });
        
        // Gallery click handling with mode-specific behavior
        document.addEventListener('click', (e) => this.handleGalleryClick(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Batch upload setup
        this.setupBatchUpload();
    }
    
    // ========================================================================
    // STATE MANAGEMENT METHODS
    // ========================================================================
    
    handleToggleClick() {
        // Simple button - only goes from Normal to Edit View
        if (this.currentMode === this.MODES.NORMAL) {
            this.switchToMode(this.MODES.EDIT_VIEW);
        }
    }
    
    switchToMode(newMode) {
        console.log(`🔄 Switching from ${this.currentMode} to ${newMode}`);
        
        // Exit current mode
        this.exitCurrentMode();
        
        // Enter new mode
        this.currentMode = newMode;
        this.enterNewMode(newMode);
        
        // Update toggle button state
        this.updateToggleButton();
        
        // Show appropriate toast
        this.showModeToast(newMode);
    }
    
    exitCurrentMode() {
        // Remove all mode classes
        document.body.classList.remove('edit-view-mode', 'edit-select-mode');
        
        // Hide all headers and action bar
        this.editViewHeader.style.display = 'none';
        this.editSelectHeader.style.display = 'none';
        this.actionBar.classList.remove('visible');
        
        // Show floating buttons
        this.showFloatingButtons();
        
        // Remove checkboxes
        this.removeCheckboxes();
        
        // Clear selections
        this.clearAllSelections();
        
        // Restore body padding
        document.body.style.paddingTop = this.originalBodyPadding;
        
        // Re-enable animations and interactions
        this.enableAnimations();
    }
    
    enterNewMode(mode) {
        switch (mode) {
            case this.MODES.NORMAL:
                this.enterNormalMode();
                break;
            case this.MODES.EDIT_VIEW:
                this.enterEditViewMode();
                break;
            case this.MODES.EDIT_SELECT:
                this.enterEditSelectMode();
                break;
        }
    }
    
    enterNormalMode() {
        console.log('🎨 Entering Normal Gallery Mode');
        
        // Show edit button again
        this.showEditButton();
        
        // Default state - no special setup needed
    }
    
    enterEditViewMode() {
        console.log('📝 Entering Edit View Mode');
        
        // Add mode class
        document.body.classList.add('edit-view-mode');
        
        // Show edit view header
        this.editViewHeader.style.display = 'block';
        
        // Hide floating buttons and edit button
        this.hideFloatingButtons();
        this.hideEditButton();
        
        // Update counters
        this.updateCounters();
        
        // Add body padding for header
        this.originalBodyPadding = document.body.style.paddingTop;
        document.body.style.paddingTop = '80px';
        
        // Disable heavy animations for performance
        this.disableAnimations();
    }
    
    enterEditSelectMode() {
        console.log('☑️ Entering Edit Select Mode');
        
        // Add mode classes
        document.body.classList.add('edit-view-mode', 'edit-select-mode');
        
        // Show edit select header
        this.editSelectHeader.style.display = 'block';
        
        // Hide edit view header
        this.editViewHeader.style.display = 'none';
        
        // Hide edit button completely (use Cancel Select instead)
        this.hideEditButton();
        
        // Add checkboxes
        this.addCheckboxes();
        
        // Update counters
        this.updateCounters();
        
        // Disable lightbox interactions
        this.disableLightboxInteractions();
    }
    
    updateToggleButton() {
        // Simple button - always same appearance when visible
        // Only shown in Normal Mode
        this.toggleButton.classList.remove('active'); // No active states needed
        this.toggleButton.innerHTML = '<i class="fa-light fa-pen-to-square"></i>';
        this.toggleButton.title = 'Enter Edit Mode';
    }
    
    showModeToast(mode) {
        if (!window.toast) return;
        
        switch (mode) {
            case this.MODES.NORMAL:
                window.toast.success('Returned to normal gallery view');
                break;
            case this.MODES.EDIT_VIEW:
                window.toast.info('Edit Mode: Click thumbnails to open lightbox, or use "Select" for batch operations');
                break;
            case this.MODES.EDIT_SELECT:
                window.toast.info('Select Mode: Click thumbnails to select/deselect items. Use "Cancel" to return.');
                break;
        }
    }
    
    // ========================================================================
    // INTERACTION HANDLING
    // ========================================================================
    
    handleGalleryClick(e) {
        const artwork = e.target.closest('.artwork');
        if (!artwork) return;
        
        const isCheckboxClick = e.target.classList.contains('artwork-checkbox');
        
        switch (this.currentMode) {
            case this.MODES.NORMAL:
                // Normal behavior - handled by other scripts
                break;
                
            case this.MODES.EDIT_VIEW:
                // Allow lightbox to open - handled by lightbox script
                break;
                
            case this.MODES.EDIT_SELECT:
                // Only handle selection, prevent lightbox
                e.preventDefault();
                e.stopPropagation();
                
                if (!isCheckboxClick) {
                    // Click on artwork toggles checkbox
                    const checkbox = artwork.querySelector('.artwork-checkbox');
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                        this.handleSelectionChange(artwork, checkbox.checked);
                    }
                }
                break;
        }
    }
    
    handleKeyboard(e) {
        // Only handle shortcuts in edit modes
        if (this.currentMode === this.MODES.NORMAL) return;
        
        switch (e.key) {
            case 'Escape':
                if (this.currentMode === this.MODES.EDIT_SELECT) {
                    this.switchToMode(this.MODES.EDIT_VIEW);
                } else if (this.currentMode === this.MODES.EDIT_VIEW) {
                    this.switchToMode(this.MODES.NORMAL);
                }
                break;
                
            case 'a':
                if (e.ctrlKey && this.currentMode === this.MODES.EDIT_SELECT) {
                    e.preventDefault();
                    this.toggleSelectAll();
                }
                break;
                
            case 'Delete':
                if (this.currentMode === this.MODES.EDIT_SELECT && this.selectedItems.size > 0) {
                    e.preventDefault();
                    this.deleteSelected();
                }
                break;
        }
    }
    
    // ========================================================================
    // CHECKBOX AND SELECTION MANAGEMENT
    // ========================================================================
    
    addCheckboxes() {
        const artworks = document.querySelectorAll('.artwork');
        artworks.forEach(artwork => {
            if (!artwork.querySelector('.artwork-checkbox')) {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'artwork-checkbox';
                checkbox.dataset.id = artwork.dataset.id;
                
                const container = artwork.querySelector('.artwork-container');
                container.appendChild(checkbox);
                
                // Checkbox change event
                checkbox.addEventListener('change', (e) => {
                    e.stopPropagation();
                    this.handleSelectionChange(artwork, e.target.checked);
                });
            }
        });
    }
    
    removeCheckboxes() {
        document.querySelectorAll('.artwork-checkbox').forEach(checkbox => {
            checkbox.remove();
        });
    }
    
    handleSelectionChange(artwork, isSelected) {
        const id = artwork.dataset.id;
        
        if (isSelected) {
            this.selectedItems.add(id);
            artwork.classList.add('selected');
        } else {
            this.selectedItems.delete(id);
            artwork.classList.remove('selected');
        }
        
        this.updateCounters();
        this.updateActionBar();
    }
    
    toggleSelectAll() {
        const checkboxes = document.querySelectorAll('.artwork-checkbox');
        const allSelected = checkboxes.length === this.selectedItems.size;
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allSelected;
            const artwork = checkbox.closest('.artwork');
            this.handleSelectionChange(artwork, !allSelected);
        });
        
        // Update button text
        const btn = this.editSelectHeader.querySelector('.btn-select-all');
        btn.innerHTML = allSelected ? 
            '<i class="fas fa-check-square"></i> Select All' : 
            '<i class="fas fa-square"></i> Deselect All';
    }
    
    clearAllSelections() {
        this.selectedItems.clear();
        document.querySelectorAll('.artwork.selected').forEach(artwork => {
            artwork.classList.remove('selected');
            const checkbox = artwork.querySelector('.artwork-checkbox');
            if (checkbox) checkbox.checked = false;
        });
        this.updateCounters();
        this.updateActionBar();
    }
    
    updateCounters() {
        const totalArtworks = document.querySelectorAll('.artwork').length;
        
        // Update total counter in edit view
        const totalCounter = document.getElementById('total-count');
        if (totalCounter) {
            totalCounter.textContent = totalArtworks;
        }
        
        // Update selection counter in edit select
        const selectedCounter = document.getElementById('selected-count');
        const selectTotalCounter = document.getElementById('select-total-count');
        
        if (selectedCounter) {
            selectedCounter.textContent = this.selectedItems.size;
        }
        if (selectTotalCounter) {
            selectTotalCounter.textContent = totalArtworks;
        }
    }
    
    updateActionBar() {
        if (this.currentMode === this.MODES.EDIT_SELECT) {
            if (this.selectedItems.size > 0) {
                this.actionBar.classList.add('visible');
            } else {
                this.actionBar.classList.remove('visible');
            }
        } else {
            this.actionBar.classList.remove('visible');
        }
    }
    
    // ========================================================================
    // BATCH OPERATIONS
    // ========================================================================
    
    async deleteSelected() {
        if (this.selectedItems.size === 0) return;
        
        const count = this.selectedItems.size;
        const confirmed = confirm(`Are you sure you want to delete ${count} selected items?`);
        
        if (!confirmed) return;
        
        if (window.toast) {
            window.toast.info(`Deleting ${count} items...`);
        }
        
        try {
            const deletePromises = Array.from(this.selectedItems).map(async (id) => {
                const response = await fetch(`/delete/${id}`, {
                    method: 'POST'
                });
                
                if (response.ok) {
                    const artwork = document.querySelector(`[data-id="${id}"]`);
                    if (artwork) {
                        artwork.remove();
                    }
                }
                
                return response;
            });
            
            await Promise.all(deletePromises);
            
            this.clearAllSelections();
            this.updateCounters();
            
            if (window.toast) {
                window.toast.success(`Successfully deleted ${count} items!`);
            }
            
            if (window.artGalleryApp?.updateImageCounter) {
                window.artGalleryApp.updateImageCounter();
            }
            
        } catch (error) {
            console.error('Delete error:', error);
            if (window.toast) {
                window.toast.error('Failed to delete some items');
            }
        }
    }
    
    async moveSelectedToTop() {
        if (this.selectedItems.size === 0) return;
        
        if (window.toast) {
            window.toast.info(`Moving ${this.selectedItems.size} items to top...`);
        }
        
        const gallery = document.getElementById('gallery');
        const selectedElements = [];
        const otherElements = [];
        
        Array.from(gallery.children).forEach(artwork => {
            if (this.selectedItems.has(artwork.dataset.id)) {
                selectedElements.push(artwork);
            } else {
                otherElements.push(artwork);
            }
        });
        
        // Reorder DOM
        gallery.innerHTML = '';
        selectedElements.forEach(el => gallery.appendChild(el));
        otherElements.forEach(el => gallery.appendChild(el));
        
        // Update server
        await this.updateServerOrder();
        
        this.clearAllSelections();
        
        if (window.toast) {
            window.toast.success('Items moved to top!');
        }
    }
    
    async moveSelectedToBottom() {
        if (this.selectedItems.size === 0) return;
        
        if (window.toast) {
            window.toast.info(`Moving ${this.selectedItems.size} items to bottom...`);
        }
        
        const gallery = document.getElementById('gallery');
        const selectedElements = [];
        const otherElements = [];
        
        Array.from(gallery.children).forEach(artwork => {
            if (this.selectedItems.has(artwork.dataset.id)) {
                selectedElements.push(artwork);
            } else {
                otherElements.push(artwork);
            }
        });
        
        // Reorder DOM
        gallery.innerHTML = '';
        otherElements.forEach(el => gallery.appendChild(el));
        selectedElements.forEach(el => gallery.appendChild(el));
        
        // Update server
        await this.updateServerOrder();
        
        this.clearAllSelections();
        
        if (window.toast) {
            window.toast.success('Items moved to bottom!');
        }
    }
    
    async updateServerOrder() {
        const gallery = document.getElementById('gallery');
        const artworks = Array.from(gallery.children);
        const totalCount = artworks.length;
        
        const order = artworks.map((el, idx) => ({
            id: el.dataset.id,
            position: totalCount - idx
        }));
        
        try {
            const response = await fetch('/update-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order })
            });
            
            return response.ok;
        } catch (error) {
            console.error('Update order error:', error);
            return false;
        }
    }
    
    // ========================================================================
    // UI VISIBILITY MANAGEMENT
    // ========================================================================
    
    hideFloatingButtons() {
        this.floatingButtons.forEach(button => {
            if (button && button !== this.toggleButton) {
                button.style.display = 'none';
            }
        });
    }
    
    showFloatingButtons() {
        this.floatingButtons.forEach(button => {
            if (button && button !== this.toggleButton) {
                button.style.display = '';
            }
        });
    }
    
    hideEditButton() {
        if (this.toggleButton) {
            this.toggleButton.style.display = 'none';
        }
    }
    
    showEditButton() {
        if (this.toggleButton) {
            this.toggleButton.style.display = '';
        }
    }
    
    disableAnimations() {
        const style = document.createElement('style');
        style.id = 'edit-mode-performance';
        style.textContent = `
            .edit-view-mode .artwork,
            .edit-select-mode .artwork {
                transition: none !important;
                animation: none !important;
                will-change: auto !important;
            }
            .edit-view-mode .artwork:hover,
            .edit-select-mode .artwork:hover {
                transform: none !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    enableAnimations() {
        const style = document.getElementById('edit-mode-performance');
        if (style) {
            style.remove();
        }
    }
    
    disableLightboxInteractions() {
        // Prevent lightbox from opening in select mode
        document.body.classList.add('disable-lightbox');
    }
    
    // ========================================================================
    // BATCH UPLOAD (REUSED FROM ORIGINAL)
    // ========================================================================
    
    openBatchUpload() {
        this.batchUploadModal.style.display = 'block';
        this.resetBatchUploadModal();
    }
    
    resetBatchUploadModal() {
        this.batchFiles = [];
        
        const previewGrid = this.batchUploadModal.querySelector('#batch-preview-grid');
        previewGrid.innerHTML = '';
        
        const progressContainer = this.batchUploadModal.querySelector('#batch-upload-progress');
        progressContainer.style.display = 'none';
        progressContainer.innerHTML = '';
        
        const uploadBtn = this.batchUploadModal.querySelector('#start-batch-upload');
        uploadBtn.style.display = 'none';
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Upload All Images';
        
        const fileInput = this.batchUploadModal.querySelector('#batch-file-input');
        fileInput.value = '';
        
        console.log('✅ Batch upload modal reset successfully');
    }
    
    closeBatchUpload() {
        this.batchUploadModal.style.display = 'none';
        this.resetBatchUploadModal();
        console.log('✅ Batch upload modal closed and cleaned up');
    }
    
    setupBatchUpload() {
        const modal = this.batchUploadModal;
        const dropZone = modal.querySelector('.batch-drop-zone');
        const fileInput = modal.querySelector('#batch-file-input');
        const previewGrid = modal.querySelector('#batch-preview-grid');
        const uploadBtn = modal.querySelector('#start-batch-upload');
        
        dropZone.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', (e) => {
            this.handleBatchFiles(e.target.files);
        });
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            this.handleBatchFiles(e.dataTransfer.files);
        });
        
        uploadBtn.addEventListener('click', () => this.startBatchUpload());
        
        modal.querySelector('.close').addEventListener('click', () => this.closeBatchUpload());
        modal.querySelector('#cancel-batch-upload').addEventListener('click', () => this.closeBatchUpload());
    }
    
    handleBatchFiles(files) {
        const validFiles = Array.from(files).filter(file => {
            if (!file.type.startsWith('image/')) {
                if (window.toast) {
                    window.toast.warning(`${file.name} is not an image`);
                }
                return false;
            }
            if (file.size > 15 * 1024 * 1024) {
                if (window.toast) {
                    window.toast.warning(`${file.name} is too large (max 15MB)`);
                }
                return false;
            }
            return true;
        });
        
        this.batchFiles = [...this.batchFiles, ...validFiles];
        this.updateBatchPreview();
        
        if (this.batchFiles.length > 0) {
            this.batchUploadModal.querySelector('#start-batch-upload').style.display = 'block';
        }
    }
    
    updateBatchPreview() {
        const previewGrid = this.batchUploadModal.querySelector('#batch-preview-grid');
        previewGrid.innerHTML = '';
        
        this.batchFiles.forEach((file, index) => {
            const preview = document.createElement('div');
            preview.className = 'batch-preview-item';
            
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = file.name;
            img.onload = () => URL.revokeObjectURL(img.src);
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = () => {
                this.batchFiles.splice(index, 1);
                this.updateBatchPreview();
                if (this.batchFiles.length === 0) {
                    this.batchUploadModal.querySelector('#start-batch-upload').style.display = 'none';
                }
            };
            
            preview.appendChild(img);
            preview.appendChild(removeBtn);
            previewGrid.appendChild(preview);
        });
    }
    
    async startBatchUpload() {
        if (this.batchFiles.length === 0) return;
        
        const progressContainer = this.batchUploadModal.querySelector('#batch-upload-progress');
        const uploadBtn = this.batchUploadModal.querySelector('#start-batch-upload');
        const cancelBtn = this.batchUploadModal.querySelector('#cancel-batch-upload');
        
        progressContainer.style.display = 'block';
        progressContainer.innerHTML = '';
        uploadBtn.disabled = true;
        uploadBtn.textContent = 'Uploading...';
        cancelBtn.disabled = true;
        
        let successCount = 0;
        
        try {
            for (let i = 0; i < this.batchFiles.length; i++) {
                const file = this.batchFiles[i];
                const progressItem = document.createElement('div');
                progressItem.className = 'progress-item';
                progressItem.innerHTML = `
                    <p>${file.name}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                `;
                progressContainer.appendChild(progressItem);
                
                const progressFill = progressItem.querySelector('.progress-fill');
                
                try {
                    const formData = new FormData();
                    formData.append('image', file);
                    formData.append('title', '');
                    formData.append('description', '');
                    
                    const response = await fetch('/add', {
                        method: 'POST',
                        body: formData
                    });
                    
                    if (response.ok) {
                        successCount++;
                        progressFill.style.width = '100%';
                        progressFill.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    } else {
                        throw new Error('Upload failed');
                    }
                } catch (error) {
                    progressFill.style.width = '100%';
                    progressFill.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                }
            }
            
            if (window.toast) {
                window.toast.success(`Uploaded ${successCount} of ${this.batchFiles.length} images!`);
            }
            
            setTimeout(() => {
                this.closeBatchUpload();
                this.refreshGalleryInEditMode();
            }, 2000);
            
        } catch (error) {
            console.error('Batch upload error:', error);
            if (window.toast) {
                window.toast.error('Batch upload failed');
            }
            
            uploadBtn.disabled = false;
            uploadBtn.textContent = 'Upload All Images';
            cancelBtn.disabled = false;
        }
    }
    
    async refreshGalleryInEditMode() {
        try {
            const response = await fetch('/api/artworks');
            const data = await response.json();
            
            if (data.success) {
                const gallery = document.getElementById('gallery');
                gallery.innerHTML = data.artworks.map(artwork => this.createArtworkHTML(artwork)).join('');
                
                // Re-setup based on current mode
                if (this.currentMode === this.MODES.EDIT_SELECT) {
                    this.addCheckboxes();
                }
                
                this.updateCounters();
                
                if (window.lazyLoader) {
                    const images = gallery.querySelectorAll('img.lazy');
                    window.lazyLoader.observe(images);
                }
                
                if (window.artGalleryApp?.updateImageCounter) {
                    window.artGalleryApp.updateImageCounter();
                }
            }
        } catch (error) {
            console.error('Error refreshing gallery:', error);
            sessionStorage.setItem('restoreEditMode', 'true');
            window.location.reload();
        }
    }
    
    createArtworkHTML(artwork) {
        return `
            <div class="artwork" data-id="${artwork.id}">
                <div class="artwork-container">
                    <img data-src="${artwork.thumbnail_path}" 
                         data-full-src="${artwork.image_path}"
                         alt="${artwork.title || ''}" 
                         class="lazy">
                    <div class="artwork-actions">
                        <button class="btn-edit" data-id="${artwork.id}" 
                                data-title="${artwork.title || ''}" 
                                data-description="${artwork.description || ''}">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="btn-delete" data-id="${artwork.id}" 
                                data-title="${artwork.title || ''}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="artwork-info">
                    ${artwork.title ? `<h3 class="artwork-title">${artwork.title}</h3>` : ''}
                    <div class="artwork-description">
                        <p class="truncated-description">${artwork.description || ''}</p>
                        ${artwork.description?.length > 120 ? 
                          `<button class="btn-see-more" data-id="${artwork.id}">See more</button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    // ========================================================================
    // PUBLIC API
    // ========================================================================
    
    getCurrentMode() {
        return this.currentMode;
    }
    
    getSelectedItems() {
        return Array.from(this.selectedItems);
    }
    
    getStats() {
        return {
            currentMode: this.currentMode,
            selectedCount: this.selectedItems.size,
            totalItems: document.querySelectorAll('.artwork').length
        };
    }
}

// ============================================================================
// INITIALIZE WHEN DOM READY
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    window.editModeManager = new EditModeManager();
    console.log('✨ Enhanced Edit Mode Manager initialized');
});
