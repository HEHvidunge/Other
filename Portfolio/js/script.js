document.addEventListener('DOMContentLoaded', function () {
  const aboutMeBtn = document.getElementById('aboutMeBtn');
  const landscapesBtn = document.getElementById('landscapesBtn');
  const portraitsBtn = document.getElementById('portraitsBtn');

  const gallerySection = document.getElementById('gallerySection');

  aboutMeBtn.addEventListener('click', function () {
    showSection('aboutMeSection');
  });

  landscapesBtn.addEventListener('click', function () {
    showSection('gallerySection');
    loadGallery('data/landscapes.json', gallerySection);
  });

  portraitsBtn.addEventListener('click', function () {
    showSection('gallerySection');
    loadGallery('data/portraits.json', gallerySection);
  });

  // Initially show about me section
  showSection('aboutMeSection');
});

function showSection(sectionId) {
  const sections = ['aboutMeSection', 'gallerySection'];
  sections.forEach(section => {
    const element = document.getElementById(section);
    if (section === sectionId) {
      element.classList.add('active-section');
    } else {
      element.classList.remove('active-section');
    }
  });
}

function loadGallery(jsonFile, container) {
  fetch(jsonFile)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      container.innerHTML = '';

      data.photo.forEach((photo, index) => {
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
    .catch(error => console.error('Error:', error));
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

document.addEventListener('keydown', function (event) {
  const gallerySection = document.getElementById('gallerySection');

  if (gallerySection.classList.contains('active-section')) {
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
