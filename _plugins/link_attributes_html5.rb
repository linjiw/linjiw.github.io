# Preserve HTML5 void elements while adding attributes to external links.
# jekyll-link-attributes 1.0.1 parses pages with Nokogiri's legacy HTML4
# parser, which serializes <source> as <source><img></source>. Replacing the
# hook implementation with the HTML5 parser keeps responsive <picture>
# markup conforming without changing the plugin's configured behavior.

require "nokogiri"

module Jekyll
  class LinkAttributes
    def self.post_render_html(article)
      config = article.site.config
      enabled = config.dig("external_links", "enabled")
      return if enabled == false

      output = Nokogiri::HTML5.parse(article.output)
      site_url = config["url"]
      excludes = config.dig("external_links", "exclude") || []
      rel = config.dig("external_links", "rel") || "external nofollow noopener"
      target = config.dig("external_links", "target") || "_blank"

      output.css("a[href]").each do |anchor|
        url = anchor["href"]
        next unless url&.match?(%r{^https?://})
        next if site_url && url.start_with?(site_url)
        next if excludes.any? { |pattern| Regexp.new("^#{pattern}$").match?(url) }

        anchor["rel"] ||= rel
        anchor["target"] ||= target
      end

      article.output = output.to_html
    end
  end
end
