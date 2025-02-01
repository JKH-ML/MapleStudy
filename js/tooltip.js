const containers = document.querySelectorAll('.tooltip-container');

containers.forEach(container => {
    const tooltip = container.querySelector('.tooltip');

    container.addEventListener('mouseenter', () => {
        tooltip.classList.add('show');
    });

    container.addEventListener('mouseleave', () => {
        tooltip.classList.remove('show');
    });
});
