$(document).ready(function() {
    if ($('.backdrop').length === 0) {
        $('body').append('<div class="backdrop"></div>');
    }

    // Initialize each image's original properties for later use
    $('.overview-img').each(function() {
        const img = $(this);
        const original = {
            width: img.width(),
            height: img.height(),
            top: img.offset().top - $(window).scrollTop(),
            left: img.offset().left - $(window).scrollLeft()
        };
        img.data('original', original); // Store the original properties in the image's data
    });

    // Event handler for clicks on images
    $('.overview-img').click(function() {
        const img = $(this);
        const original = img.data('original');
        const backdrop = $('.backdrop');

        if (!img.hasClass('enlarged')) {
            // Insert a placeholder before the image to maintain the layout
            img.before('<div class="img-placeholder" style="width: ' + original.width + 'px; height: ' + original.height + 'px;"></div>');

            // Add 'enlarged' class and fix the image's position
            img.addClass('enlarged').css({
                position: 'fixed',
                top: original.top,
                left: original.left,
                transition: 'none'
            });

            // Start fading in the backdrop immediately
            backdrop.css({
                display: 'block',
                opacity: 0
            }).animate({opacity: 1}, 500);

            // Delay the transformation to give the backdrop time to start fading
            setTimeout(() => {
                img.css({
                    transform: 'translate(-50%, -50%) scale(2)',
                    left: '50%',
                    top: '50%',
                    transition: 'transform 0.5s ease, left 0.5s ease, top 0.5s ease'
                });
            }, 10);
        } else {
            // Handle shrinking back to original size
            img.removeClass('enlarged').css({
                transform: 'translate(0, 0) scale(1)',
                left: original.left,
                top: original.top,
                transition: 'transform 0.5s ease, left 0.5s ease, top 0.5s ease'
            });

            // Fade out the backdrop and remove the placeholder when the transition is complete
            backdrop.animate({opacity: 0}, 500, function() {
                $(this).hide(); 
                $('.img-placeholder').remove(); 
                img.removeAttr('style'); 
            });
        }
    });
});






