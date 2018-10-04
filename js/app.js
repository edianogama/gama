$(document).foundation()
// https://ihatetomatoes.net/greensock-tutorial-create-simple-image-slideshow/
// https://greensock.com/forums/topic/17564-scrollmagic-horizontal-scroll-with-anchor-navigation/
// https://codepen.io/osublake/pen/QqPqbN/?editors=0010
{
    // um elemento chamado slide

    class Slide{
        constructor(el){
            this.DOM = {el: el};
            this.DOM.imgWrap = this.DOM.el.querySelector('.slide__img-wrap');
            this.DOM.img = this.DOM.el.querySelector('.slide__img');
            this.DOM.title = this.DOM.el.querySelector('.slide__caption h1');
            // criando um novo item de slide a partir deste      
            this.calcSizes();
            this.calcTransforms();
            this.hideTexts();
        }
        calcSizes(){
            console.log(this.DOM.imgWrap);
            this.width = this.DOM.imgWrap.offsetWidth;
            this.height = this.DOM.imgWrap.offsetHeight;
        }
        calcTransforms(){
            this.transforms = [
                {x: -1*(winsize.width/2+this.width), y: -1*(winsize.height/2+this.height), rotation: -30},
                {x: -1*(winsize.width/2-this.width/3), y: 0, rotation: 0}, //left 1
                {x: 0, y: 0, rotation: 0}, //centro - 2
                {x: winsize.width/2-this.width/3, y: 0, rotation: 0},
                {x: winsize.width/2+this.width, y: winsize.height/2+this.height, rotation: 30},
                {x: -1*(winsize.width/2 - this.width/2 - winsize.width*0.075), y: 0, rotation: 0}
            ];

        }
        position(pos){
            TweenMax.set(this.DOM.imgWrap, {
                x: this.transforms[pos].x, 
                y: this.transforms[pos].y, 
                rotationX: 0,
                rotationY: 0,
                opacity: 1,
                rotationZ: this.transforms[pos].rotation
            });
        }
        setCurrent(){
            this.isCurrent =true;
            this.DOM.el.classList.add('slide--current', 'slide--visible');
            this.position(2);
        }
        setLeft(){
            this.isRight = this.isCurrent = false;
            this.isLeft = true;
            this.DOM.el.classList.add('slide--visible');
            console.log(this);
            this.position(1);
        }
        setRight(){
            this.isLeft = this.isCurrent = false;
            this.isRight = true;
            this.DOM.el.classList.add('slide--visible');
            // Position it on the right position.
            this.position(3);
        }
        isPositionedLeft(){
            return this.isLeft;
        }
        isPositionedRight(){
            return this.isRight;
        }
        isPositionedCenter(){
            return this.isCurrent;
        }
        hideTexts(){
            TweenMax.set(this.DOM.title, {opacity: 0 })
        }
        showTexts(){
            TweenMax.fromTo(this.DOM.title, 0.6, {opacity: 0, y: 20 },{opacity: 1, y:0, ease: Power4.easeOut });
            // TweenMax.set(this.DOM.title, {opacity: 1});
        }
          // Reset classes and state.
        reset() {
            this.isRight = this.isLeft = this.isCurrent = false;
            this.DOM.el.classList = 'slide';
        }
        hide() {
            TweenMax.set(this.DOM.imgWrap, {x:0, y:0, rotationX:0, rotationY:0, rotationZ:0, opacity:0});
        }
        moveToPosition(settings){
            let self  = this;
            return new Promise(function(resolve, reject){
                TweenMax.to(self.DOM.imgWrap, .8, {
                    ease: Power4.easeInOut,
                    delay: settings.delay || 0,
                    startAt: settings.from !== undefined ? {
                        x: self.transforms[settings.from+2].x,
                        y: self.transforms[settings.from+2].y,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: self.transforms[settings.from+2].rotation
                    } : {},
                    x: self.transforms[settings.position+2].x,
                    y: self.transforms[settings.position+2].y,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: self.transforms[settings.position+2].rotation,
                    onStart: settings.from !== undefined ? () => TweenMax.set(self.DOM.imgWrap, {opacity: 1}) : null,
                    onComplete: resolve
                });
            })
        }
    }
    class Slideshow{
        constructor(el){
            this.DOM = {el: el};
            this.slides = [];
            Array.from(this.DOM.el.querySelectorAll('.slide')).forEach( slideEl => this.slides.push(new Slide(slideEl)));
            // total de slides criados
            this.slidesTotal = this.slides.length;
            
            //slides inicial
            this.current = 0;

            //TODO:: criar contents seguindo a lógica do slide
            this.contents = [];

            this.render();
            this.initEvents();
        }
        render(){
            // encadeando os elementos
            this.currentSlide = this.slides[this.current];
            this.nextSlide = this.slides[this.current+1 <= this.slidesTotal-1 ? this.current+1 : 0 ];
            this.prevSlide = this.slides[this.current-1 >= 0 ? this.current-1 : this.slidesTotal-1 ];
            this.currentSlide.setCurrent();
            this.nextSlide.setRight();
            this.prevSlide.setLeft();
          
            // se 0+1 for menor ou igual ao 3-1 entao aumento 1, se nao coloco 0;
        }
        initEvents(){
            // criando um evento de clicque padronizado
            this.clickFn = (slide) => {
                if(slide.isPositionedLeft()){
                    this.navigate('prev');
                }else
                if(slide.isPositionedRight()){
                    this.navigate('next');
                    console.log(slide, 'está na direita');
                }else{
                    console.log(slide, 'está na centro');
                }

            }
            // atrelando o clique a cada elemento
            for (let slide of this.slides) {
                // slide.DOM.imgWrap.addEventListener('click', () => this.clickFn(slide));
                slide.DOM.imgWrap.addEventListener('click', (function(){
                    this.clickFn(slide);
                }).bind(this));
            } 
            this.currentSlide.showTexts();          
        }
        showContent(){}
        hideContent(){}
        navigate(direction){
             // If animating return.
             if ( this.isAnimating ) return;
             this.isAnimating = true;
 
             const upcomingPos = direction === 'next' ? 
                     this.current < this.slidesTotal-2 ? this.current+2 : Math.abs(this.slidesTotal-2-this.current):
                     this.current >= 2 ? this.current-2 : Math.abs(this.slidesTotal-2+this.current);
             console.log(upcomingPos, 'upcomingPos');
             
             this.upcomingSlide = this.slides[upcomingPos];
 
             // Update current.
             this.current = direction === 'next' ? 
                     this.current < this.slidesTotal-1 ? this.current+1 : 0 :
                     this.current > 0 ? this.current-1 : this.slidesTotal-1;
             
             // Move slides (the previous, current, next and upcoming slide).
             this.prevSlide.moveToPosition({position: direction === 'next' ? -2 : 0, delay: direction === 'next' ? 0 : 0.14}).then(() => {
                 if ( direction === 'next' ) {
                     this.prevSlide.hide();
                 }
             });
             
             this.currentSlide.moveToPosition({position: direction === 'next' ? -1 : 1, delay: 0.07 });
             this.currentSlide.hideTexts();
             
             // this.bounceDeco(direction, 0.07);
             
             this.nextSlide.moveToPosition({position: direction === 'next' ? 0 : 2, delay: direction === 'next' ? 0.14 : 0 }).then(() => {
                 if ( direction === 'prev' ) {
                     this.nextSlide.hide();
                 }
             });
 
             if ( direction === 'next' ) {
                 this.nextSlide.showTexts();
             }
             else {
                 this.prevSlide.showTexts();
             }
             
             this.upcomingSlide.moveToPosition({position: direction === 'next' ? 1 : -1, from: direction === 'next' ? 2 : -2, delay: 0.21 }).then(() => {
                 // Reset classes.
                 [this.nextSlide,this.currentSlide,this.prevSlide].forEach(slide => slide.reset());
                 this.render();
                 this.isAnimating = false;
             });
        }
    }

    // window sizes;
    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight}
    calcWinsize();
    console.log(winsize, 'winsize');
    

    // Init slideshow.
    const slideshow = new Slideshow(document.querySelector('.slideshow'));
}