const preview = () => {
    let reader = new FileReader();
    let file = e.target.files[0];


    reader.onloadend = function () {
        let src = reader.result;
    };

    if (file){
        reader.readAsDataURL(file);

        form.photo = file;
    }
}
