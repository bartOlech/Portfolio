export const BorderHandle = (projectId, projectBorderId, projectReferenceId) => {

    document.querySelector(projectId).addEventListener('mouseover', () => {
        projectBorderId.setAttribute("style", "transform: translate(10px, 10px); opacity: 1");
        projectReferenceId.setAttribute("style", "display: inline");
    })

    document.querySelector(projectId).addEventListener('mouseout', () => {
        projectBorderId.setAttribute("style", "transform: translate(0, 0)");
        projectReferenceId.setAttribute("style", "display: none");
    })
}