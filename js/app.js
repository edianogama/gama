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
            // criando um novo item de slide a partir deste      
            this.calcSizes();
            this.calcTransforms();
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
        moveToPosition(settings){
            // -1 vai mover para esquerda
            // 0 center
            console.log(settings);
            return new Promise(function(resolve, reject){
               
                
            })
        }
    }
    // SIGNIFICADO DE Array.from
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

                    console.log(slide, 'está na esquerda');
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
        }
        showContent(){}
        hideContent(){}
        navigate(direction){
            // controle a animação
            if(this.isAnimating) return;
            this.isAnimating = true;
            const upcomingPos = direction === 'next' ?
                this.current < this.slidesTotal-2 ? this.current+2 : Math.abs(this.slidesTotal-2-this.current):
                this.current >= 2 ? this.current-2 : Math.abs(this.slidesTotal-2+this.current);
            console.log(upcomingPos, 'upcomingPos');                                 
            this.currentSlide.moveToPosition({position: direction === 'next' ? -1 : 1, delay: 0.07 });
            // checar se for next
            console.log(this.slidesTotal, 'slidesTotal');
            console.log(direction, 'direction');
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