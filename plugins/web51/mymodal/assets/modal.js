const CLASS_NAME_SHOW = 'show';

class ModalBtn {
    constructor(button) {
        this.button = button;
        this.modal = document.getElementById(this.button.dataset.modalId);
        this.partial = this.button.dataset.partial ? this.button.dataset.partial : undefined; 
        if(this.button.dataset.title){
        this.title = this.button.dataset.title;
        
        } 
        if (this.modal == null) return console.log('Модальное окно не найдено'); 
        this.modal.addEventListener('click', ({target}) => {
            if (target.dataset.close != undefined) this.toggleModal();
        })
        this.button.addEventListener('click', () => this.toggleModal());
        document.addEventListener('keydown', (event) => this.btnAction(event));
    }

    btnAction(event) {
        if (event.key === "Escape") {
            if (this._isShown() === true) this.toggleModal();
        }
    }

    _isShown() {
        return this.modal.classList.contains(CLASS_NAME_SHOW);
    }

    toggleModal() {
        if (this._isShown() === false && this.partial != undefined) {
            let partial = this.partial; 
            if(this.title != null && this.title != undefined){ 
            var title = this.title; 
            } else {
            var title = 'empty';  
           
            }
            const promise1 = new Promise((resolve, reject) => {
            oc.ajax('onModalUpdate', {
                update: { [partial]: '#modal-body' },
                data: {title: title}
            });
                resolve('Success!');
            });
            promise1
                .then((data) => {
                    let preloaderEl = document.getElementById('preloader');
                    preloaderEl.classList.add('hidden');
                    preloaderEl.classList.remove('visible');
                })
        }

        this.modal.classList.toggle(CLASS_NAME_SHOW, !this._isShown());
    }
    // ebobo(){
    //
    //
    //
    //     promise1.then((value) => {
    //         console.log('Ебана мать загрузилось');
    //     });
    // }


    // function loadData() {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(resolve, 2000);
    //     })
    // }
    // loadData().then(() => {
    // let preloaderEl = document.getElementById('preloader');
    // preloaderEl.classList.add('hidden');
    // preloaderEl.classList.remove('visible');
    // });
}

document.querySelectorAll('[data-modal-id]').forEach(button => {
    new ModalBtn(button);
});

