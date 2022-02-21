/**
 * Всплывающие окна уведомления.
 *
 * @param {string} title - уникальное название всплывающего окна передаётся в data атрибут
 * @param {string} body - основной текст тела окна
 * @param {Array} contols - массив объектов кнопок
 * @returns{undefined}
 */

// Вызов
// new PopUper({
//     title: 'Заголовок в header',
//     body: 'Основной текст или HTML',
//     style: 'CSS Class',
//     controls: [
//         {
//             title: 'да',
//             action: ()=>{
//                 console.log('sdsdsd');
//             },
//             enter: true,
//         },
//         {
//             title: 'нет',
//             action: ()=>{console.log('нет');},
//         },
//     ],
// })


class PopUper {

    constructor(params){

        // Создание глобального массива попаперов
        window.popUpers || (window.popUpers = []);

        // Создание объекта свойств попапера
        this.options = params || {};

        !this.options.id && (this.options.id = parseInt(new Date().getTime()));
        !this.options.body && (this.options.body = 'Hello');
        !this.options.title && (this.options.title = '');

		this.enterAction = this.enterAction.bind(this);
		this.keyEscape = this.keyEscape.bind(this);

		this._body = this.createEl('div', 'popuperWrap');
        this._body.setAttribute('data-popuperName', this.options.id);
        // Создаём элементы попапера

        this._body._popuper = this.createEl('div', `popuper`);
        if(this.options.style) this._body._popuper.classList.add(this.options.style);

        this._body._popuperHeader = this.createEl('div', 'popuper__header');
		this._body._close = this.createEl('div', 'popuper__close');
        this._body._close.addEventListener('click', ()=> this.close() );
        this._body._close.innerHTML = `
            <svg version="1.1" id="cross" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
            <path d="M7,26c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l18-18c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-18,18C7.5,25.9,7.3,26,7,26z"/>
            <path d="M25,26c-0.3,0-0.5-0.1-0.7-0.3l-18-18c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l18,18c0.4,0.4,0.4,1,0,1.4C25.5,25.9,25.3,26,25,26 z"/>
            </svg>
            `;


        if(this.options.title){
            this._body._title = this.createEl('div', 'popuper__title');
            this._body._title.innerText = this.options.title;
            this._body._popuperHeader.appendChild(this._body._title)
        }
        this._body._popuperHeader.appendChild(this._body._close);
        this._body._popuper.appendChild(this._body._popuperHeader);

        this._body._popUperbody = this.createEl('div', 'popuper__body');

        this._body._popUperbody.innerHTML = this.options.body;

        this._body._popuper.appendChild(this._body._popUperbody);
        this.enterActionArray = [];

        // Формирование кнопок
        if(this.options.controls){
            this._body._controls = this.createEl('div', 'popuper__controls');

            this.options.controls.forEach( control => {

                let controlElement = this.createEl('button');
                controlElement.innerHTML = control.title;

                controlElement.addEventListener('click', ()=>{
                    if(control.action){
                        control.action()
                    }

                    if(control.close != false){
                        this.close();
                    }
                });

                if(control.enter){
                    if(control.action) this.enterActionArray.push(control.action);
                    document.addEventListener('keydown', this.enterAction);
                }


                this._body._controls.appendChild(controlElement);
            });
            this._body._popuper.appendChild(this._body._controls);
        }
        // *** Формирование кнопок
        this._body.appendChild(this._body._popuper);


        document.body.appendChild(this._body);
        // Добавление текущего попапера в глобальный массив попаперов
		document.addEventListener('keydown',  this.keyEscape);
        window.popUpers.push(this);


        if(window.popUpers.length == 1 && !document.body.classList.contains('--fixed')){
			if(window.innerWidth - document.body.clientWidth){
				document.body.style.paddingRight = window.innerWidth- document.body.clientWidth + 'px';
			}

            document.body.classList.add('--fixed');

        }


    }

    enterAction(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.enterActionArray.forEach(item => {
                item();
            })
            this.close();
        };
    }

    keyEscape (event) {
        if(event.code === 'Escape'){
            window.popUpers[window.popUpers.indexOf(this)].close();
        };
    }


    close() {
        this._body.remove();
        window.popUpers.splice(window.popUpers.indexOf(this), 1)

        if(this.enterActionArray){
            document.removeEventListener('keydown', this.enterAction);
        }

        // window.popUpers.pop();
        if(window.popUpers.length == 0){
            document.body.classList.remove('--fixed');
			if(window.innerWidth - document.body.clientWidth){
				document.body.style.paddingRight = '';
			}
        }

		document.removeEventListener('keydown', this.keyEscape);

		if(!window.popUpers.length){
            document.body.classList.remove('--fixed');
        }
    }

    createEl(tag, className) {
        const el = document.createElement(tag);
        if(className){
            el.classList.add(className)
        }
        return el;
    }
}

