# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile += %w( canvas/jsPlumbToolkit-defaults.css )
Rails.application.config.assets.precompile += %w( canvas/main.css )
Rails.application.config.assets.precompile += %w( canvas/jsPlumbToolkit-demo.css )
Rails.application.config.assets.precompile += %w( statemachine.css )
##<!-- support lib for bezier stuff -->
#Rails.application.config.assets.precompile += %w( lib/jsBezier-0.7.js )
#<!-- event adapter -->
#Rails.application.config.assets.precompile += %w( lib/mottle-0.6.js )
#<!-- geometry functions -->
#Rails.application.config.assets.precompile += %w( lib/biltong-0.2.js )
#<!-- drag -->
#Rails.application.config.assets.precompile += %w( lib/katavorio-0.8.js )
#<!-- jsplumb util -->
#Rails.application.config.assets.precompile += %w( util.js )
#Rails.application.config.assets.precompile += %w( browser-util.js )
#<!-- main jsplumb engine -->
#Rails.application.config.assets.precompile += %w( jsPlumb.js )
#<!-- base DOM adapter -->
#Rails.application.config.assets.precompile += %w( dom-adapter.js )
#Rails.application.config.assets.precompile += %w( overlay-component.js )
#<!-- endpoint -->
#Rails.application.config.assets.precompile += %w( endpoint.js )
#<!-- connection -->
#Rails.application.config.assets.precompile += %w( connection.js )
#<!-- anchors -->
#Rails.application.config.assets.precompile += %w( anchors.js )
#<!-- connectors, endpoint and overlays  -->
#Rails.application.config.assets.precompile += %w( defaults.js )
#Rails.application.config.assets.precompile += %w( connectors-bezier.js )
#<!-- state machine connectors>
#Rails.application.config.assets.precompile += %w( connectors-statemachine.js)
#<!-- flowchart connectors -->
#Rails.application.config.assets.precompile += %w( connectors-flowchart.js )
# <!-- vml renderer -->
#Rails.application.config.assets.precompile += %w( renderers-vml.js )
# <!-- svg renderer -->
#Rails.application.config.assets.precompile += %w( renderers-svg.js )
# <!-- common adapter -->
#Rails.application.config.assets.precompile += %w( base-library-adapter.js )
#<!-- no library jsPlumb adapter -->
#Rails.application.config.assets.precompile += %w( dom.jsPlumb.js )
#<!--  demo code -->
#Rails.application.config.assets.precompile += %w( statemachine.js )