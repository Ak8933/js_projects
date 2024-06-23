document.addEventListener("DOMContentLoaded", function() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const MAX_IMAGES = 5;

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.backgroundColor = '#e0e0e0';
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.style.backgroundColor = '#fff';
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.backgroundColor = '#fff';

        const files = e.dataTransfer.files;
        manageFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        manageFiles(files);
    });

    dropzone.addEventListener('click', () => {
        fileInput.click();
    });

    function manageFiles(files) {
        let totalFiles = fileList.children.length;
    
        Array.from(files).forEach(file => {
            // Check if the file is an image
            if (!file.type.startsWith('image/')) {
                alert("File " + file.name + " is not an image and won't be added.");
            }
            // Check if the file size is greater than 1MB
            else if (file.size > 1024 * 1024) {
                alert("File " + file.name + " is larger than 1MB and won't be added.");
            } else {
                totalFiles++;
                if (totalFiles <= MAX_IMAGES) {
                    displayFile(file);
                } else {
                    alert("Maximum images allowed is " + MAX_IMAGES + ". " + file.name + " won't be added.");
                }
            }
        });
    
        // Remove excess files if necessary
        while (fileList.children.length > MAX_IMAGES) {
            fileList.removeChild(fileList.firstChild);
        }
    
        saveToLocalStorage();
    }
    
    

    function displayFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const div = document.createElement('div');
            div.className = 'file-name';
        
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;
            img.className = 'thumbnail';
            div.appendChild(img);
    
            // Add a textarea for image description
            const textarea = document.createElement('textarea');
            textarea.placeholder = "Add a description...";
    
            // Save to localStorage once the description is added/changed and textarea loses focus
            textarea.addEventListener('blur', saveToLocalStorage);
    
            div.appendChild(textarea);
        
            const deleteIcon = document.createElement('span');
            deleteIcon.textContent = '❌';
            deleteIcon.className = 'delete-icon';
            deleteIcon.addEventListener('click', function() {
                fileList.removeChild(div);
                saveToLocalStorage();
            });
            div.appendChild(deleteIcon);
        
            fileList.appendChild(div);
        }
        
        reader.readAsDataURL(file);
    }
    
    

    // function saveToLocalStorage() {
    //     const images = Array.from(fileList.children).map(child => child.querySelector('.thumbnail').src);
    //     console.log("Saving to localStorage:", images);
    //     localStorage.setItem('storedImages', JSON.stringify(images));
    // }
    function saveToLocalStorage() {
        const imagesData = Array.from(fileList.children).map(child => {
            return {
                src: child.querySelector('.thumbnail').src,
                description: child.querySelector('textarea').value
            };
        });
        console.log("Saving to localStorage:", imagesData);
        localStorage.setItem('storedImagesData', JSON.stringify(imagesData));
    }
    
    function loadFromLocalStorage() {
        const storedImagesData = JSON.parse(localStorage.getItem('storedImagesData') || '[]');
        console.log("Loaded from localStorage:", storedImagesData);
        storedImagesData.forEach(data => {
            const div = document.createElement('div');
            div.className = 'file-name';
    
            const img = document.createElement('img');
            img.src = data.src;
            img.className = 'thumbnail';
            div.appendChild(img);
    
            const textarea = document.createElement('textarea');
            textarea.value = data.description;
            textarea.placeholder = "Add a description...";
            div.appendChild(textarea);
    
            const deleteIcon = document.createElement('span');
            deleteIcon.textContent = '❌';
            deleteIcon.className = 'delete-icon';
            deleteIcon.addEventListener('click', function() {
                fileList.removeChild(div);
                saveToLocalStorage();
            });
            div.appendChild(deleteIcon);
    
            fileList.appendChild(div);
        });
    }
    

    // Restore images from local storage on page load
    loadFromLocalStorage();
});
