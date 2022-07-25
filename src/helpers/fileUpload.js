

export const fileUpload = async(file) =>{
    if (!file) throw new Error('No existe archivo el cual subir')
    const cloudUrl = 'https://api.cloudinary.com/v1_1/drp7cwb8s/upload'
    const formData = new FormData();
    formData.append('upload_preset','react-journal-vite')
    formData.append('file', file)
    try {
        
        const resp = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        })

        if (!resp.ok) throw new Error('No se pudo subir la imagen')

        const cloudResp = await resp.json()

        console.log(cloudResp.secure_url)

        return cloudResp.secure_url

    } catch (error) {
        throw new Error(error.message)
    }

}