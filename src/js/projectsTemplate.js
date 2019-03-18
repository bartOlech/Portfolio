const mouseOver = (projectDescription, projectReference) => {
    document.querySelector(projectDescription).style.display = 'inline';
    document.querySelector(projectReference).style.display = 'flex';
}
const mouseOut = (projectDescription, projectReference) => {
    document.querySelector(projectDescription).style.display = 'none'
    document.querySelector(projectReference).style.display = 'none';
}
export {mouseOver, mouseOut}