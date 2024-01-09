document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const gallerySections = document.querySelectorAll('.gallery-container');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const sectionId = this.getAttribute('data-section');
        showSection(sectionId);
      });
    });
  
    // Initially show the first section
    showSection(gallerySections[0].id);
  });
  
  function showSection(sectionId) {
    const sections = document.querySelectorAll('.gallery-container');
    sections.forEach(section => {
      if (section.id === sectionId) {
        section.classList.add('active-section');
      } else {
        section.classList.remove('active-section');
      }
    });
  }
  
  function loadGallery(jsonFile, container) {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        container.innerHTML = '';
  
        data.forEach((photo, index) => {
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
          container.appendChild(galleryItem);
        });
      })
      .catch(error => console.error('Error fetching gallery data:', error));
  }
  
  function navigateGallery(direction) {
    const activeSection = document.querySelector('.gallery-container.active-section');
    const galleryItems = activeSection.getElementsByClassName('gallery-item');
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
  
  document.addEventListener('keydown', function (event) {
    const activeSection = document.querySelector('.gallery-container.active-section');
    if (activeSection) {
      navigateGalleryByArrow(event.key);
    }
  });
  
  function navigateGalleryByArrow(key) {
    if (key === 'ArrowLeft') {
      navigateGallery('prev');
    } else if (key === 'ArrowRight') {
      navigateGallery('next');
    }
  }
  