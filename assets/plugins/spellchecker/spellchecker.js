if (!RedactorPlugins) var RedactorPlugins = {};

(function($)
{
    RedactorPlugins.spellchecker = function() {
        return {
            init: function () {
                var button = this.button.add('spellchecker', 'Spellchecker');
                this.button.addCallback(button, this.spellchecker.toggle);
            },
            create: function () {

                this.spellchecker.spellchecker = new $.SpellChecker(this.$editor, {
                    lang: 'en',
                    parser: 'html',
                    webservice: {
                        path: "/webservices/php/SpellChecker.php",
                        driver: 'pspell'
                    },
                    suggestBox: {
                        position: 'below'
                    }
                });

                // Bind spellchecker handler functions
                this.spellchecker.spellchecker.on('check.success', function () {
                    //alert('There are no incorrectly spelt words.');
                });
            },
            enable: function (){
        	this.button.get('spellchecker').addClass('active');
                this.spellchecker.create();
                this.spellchecker.spellchecker.check();
            },
            disable: function () {
        	this.button.get('spellchecker').removeClass('active');
                this.spellchecker.spellchecker.destroy();
                this.spellchecker.spellchecker = null;
            },
            toggle: function () {
                if (!this.spellchecker.spellchecker) {
                    this.spellchecker.enable();
                } else {
                    this.spellchecker.disable();
                }
            }
        };
    };
})(jQuery);
