require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Workspace
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
    config.assets.compile = true
    config.assets.precompile = ['*.min.js','*.js','jquery-ui.min.js', '*.png','bootstrap.min.css', '*.css.erb','tri/hill.png','tri/house.png','tri/sun.png',
    'tri/birds1.png','tri/birds2.png','animate.min.css','application.scss','bootstrap-responsive.css','custom.css','font-awesome',
    'font-awesome.css','jquery-ui.css','jquery-ui.structure.css','jquery-ui.theme.css','lightbox.css','main.css','prettyPhoto.css',
    'responsive','style.css','msearch.js','common.js','logo.png','tri/mov.png','tri/hulu.png','tri/nf.png','tri/it.png','tri/nf2.png','searchbar.css']
    #config.assets.precompile = ['*.min.js','*.js','*.png','tri/*.png']
  end
end
