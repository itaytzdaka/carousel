const imagesArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"];

function loadImages(imagesArray) {
    for (let i = 0; i < imagesArray.length; i++) {
        let img = new Image();
        img.src = "assets/images/" + imagesArray[i];
        img.classList.add("gallery-item", `gallery-item-${i + 1}`);
        document.getElementById('gallery-container').appendChild(img);
    }
}

loadImages(imagesArray);


const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ["previous", "next"];
const galleryDotsContainer = document.querySelector('.gallery-dots');
const galleryItems = document.querySelectorAll(".gallery-item");

class Carousel {

    constructor(container, item, controls, order = 0) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...item];
        this.carouselArrayChanged = [...item];
        this.order = order;
    }


    updateGallery() {

        //remove all images classes
        this.carouselArrayChanged.forEach(el => {
            el.classList.remove("gallery-item-1");
            el.classList.remove("gallery-item-2");
            el.classList.remove("gallery-item-3");
            el.classList.remove("gallery-item-4");
            el.classList.remove("gallery-item-5");
        });

        //give new classes by the new array order.
        if (this.carouselArrayChanged.length == 1) {
            this.carouselArrayChanged[0].classList.add(`gallery-item-3`);
        }

        else if (this.carouselArrayChanged.length == 2) {
            this.carouselArrayChanged[0].classList.add(`gallery-item-3`);
            this.carouselArrayChanged[1].classList.add(`gallery-item-4`);
        }

        else if (this.carouselArrayChanged.length == 3) {
            this.carouselArrayChanged[0].classList.add(`gallery-item-3`);
            this.carouselArrayChanged[1].classList.add(`gallery-item-4`);
            this.carouselArrayChanged[2].classList.add(`gallery-item-2`);
        }

        else {
            this.carouselArrayChanged.forEach((el, i) => {
                //set 2 last array's elements classes to be first, and the rest set classes from position 3 
                const index = i + 1 <= this.carouselArrayChanged.length - 2 ? i + 3 : (i + 1 + 2) - this.carouselArrayChanged.length;
                el.classList.add(`gallery-item-${index}`);
            });
        }
    }


    setCurrentState(order) {

        //change array back to default order
        this.carouselArrayChanged = [...this.carouselArray]

        //change array order
        while (order != 0) {
            if (order > 0) {
                order--;
                this.carouselArrayChanged.push(this.carouselArrayChanged.shift());
            }
            else {
                order++;
                this.carouselArrayChanged.unshift(this.carouselArrayChanged.pop());
            }
        }

        //update gallery
        this.updateGallery();
    }

    //set the order, handle exceptions, and change the gallery.
    setOrder(num) {
        this.order = num;
        if (this.order === this.carouselArray.length) {
            this.order = 0;
        }
        if (this.order === -1) {
            this.order = this.carouselArray.length - 1;
        }

        //change current array order and update dot active
        this.updateActiveDot(this.order);
        this.setCurrentState(this.order);
    }

    //add controls to html
    setControls() {
        this.carouselControls.forEach(control => {

            let button = document.createElement('button');
            let icon = document.createElement('div');
            let arrow = document.createElement('div');

            galleryControlsContainer.appendChild(button).className = `gallery-controls-${control}`;
            button.appendChild(icon).className = `icon-${control}`;
            icon.appendChild(arrow).className = `arrow-${control}`;
        });
    }

    //add event listeners to the controls
    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener("click", e => {
                e.preventDefault();
                if (control.className == "gallery-controls-previous") {
                    this.setOrder(this.order - 1);
                }

                else {
                    this.setOrder(this.order + 1);
                }
            });
        });
    }

    //add dots to html
    setDots() {
        
        for (let i = 0; i < this.carouselArray.length; i++) {
            
            let dot = document.createElement('span');

            if (i === 0) {
                galleryDotsContainer.appendChild(dot).className = `gallery-dot gallery-dot-${i + 1} active`;
            }
            else {
                galleryDotsContainer.appendChild(dot).className = `gallery-dot gallery-dot-${i + 1}`;
            }
        }

    }

    //add event listeners to the dots
    useDots() {
        const triggers = [...galleryDotsContainer.childNodes];
        triggers.forEach((dot, i) => {
            dot.addEventListener("click", e => {
                e.preventDefault();

                //remove previous active dot
                triggers.forEach(el => {
                    el.classList.remove("active");
                });

                //add a new active dot
                dot.classList.add("active");

                //change the current array order
                this.setCurrentState(i);
            });
        });
    }

    //erase dots active class and add active class by order
    updateActiveDot(order){
        const triggers = [...galleryDotsContainer.childNodes];
    
         //remove previous active dot
         triggers.forEach((dot,i) => {
            dot.classList.remove("active");
    
            //add a new active dot
            if(i == order){
                dot.classList.add("active");
            }
    
        });        
    }
}



const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.updateGallery();
exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.setDots();
exampleCarousel.useDots();





