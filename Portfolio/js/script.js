
      let currentSection = 'about-me';
  
      function showSection(section) {
        document.getElementById(currentSection).classList.remove('active-section');
        document.getElementById(section).classList.add('active-section');
        currentSection = section;
      }
  
      function loadGallery(category) {
        const galleryContainer = document.getElementById('gallery');
        galleryContainer.innerHTML = ''; // Clear previous content
  
        fetch('photos.json')
          .then(response => response.json())
          .then(data => {
            const photos = data[category];
  
            photos.forEach((photo, index) => {
              const galleryItem = document.createElement('div');
              galleryItem.className = 'gallery-item';
              galleryItem.style.display = index === 0 ? 'block' : 'none';
  
              const img = document.createElement('img');
              img.src = photo.url;
              img.alt = photo.description;
  
              const description = document.createElement('p');
              description.textContent = photo.description;
  
              galleryItem.appendChild(img);
              galleryItem.appendChild(description);
              galleryContainer.appendChild(galleryItem);
            });
  
            showSection('gallery');
          })
          .catch(error => console.error('Error fetching photos.json:', error));
      }
  
      function navigateGallery(direction) {
        const galleryItems = document.getElementsByClassName('gallery-item');
        let currentIndex = Array.from(galleryItems).findIndex(item => item.style.display !== 'none');
  
        if (currentIndex !== -1) {
          galleryItems[currentIndex].style.display = 'none';
  
          if (direction === 'next') {
            currentIndex = (currentIndex + 1) % galleryItems.length;
          } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
          }
  
          galleryItems[currentIndex].style.display = 'block';
        }
      }
  
      document.addEventListener('DOMContentLoaded', function () {
        showSection('about-me');
      });
