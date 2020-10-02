

export const  saveLoginSession = (response) => {
    if (response.data) {
        sessionStorage.setItem('AuthResults', JSON.stringify(response.data['AuthenticationResult']))
    }
}