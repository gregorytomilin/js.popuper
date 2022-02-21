# Usage

Create your own pop-up window with your layout and your styles!<br/>


# Использование
Создавайте свой собственный попапер, применяйте свой CSS стили


# Вызов класса | Class call
```sh
    new PopUper({
        title : 'HTML or text for PopUper title',
        body: 'HTML or text for PopUper body',
        controls: // Optional
            [
            {
                title: 'HTML or text for Button',
                action: () => {/*any function. Optional */},
                enter: false // Boolean (true or false) // action of button will execution by event of enter button keyup. False is default. Optional

            },
            {
                title: 'HTML or text for Button',
                action: () => { /* any function. Optional */ },
            }
            // etc...

            ]
    })
```

## License

MIT

