class SearchController < ApplicationController 
  
  def index
    render layout: "blank"
  end
  
  def search
    render layout: "triangle"
  end
  def test

  end
    
  def gl
    #render layout: "blank"
    if params.has_key?(:url)
      @url = params[:url]  
    else
      @url = "netflixcanadavsusa.netflixable.com/2016/03/complete-alphabetical-list-k-tue-mar-29.html"
    end
    if params.has_key?(:title)
      @title = params[:title]  
    else
      @title = ""
    end
    
    require 'net/http'

    url = URI.parse('http://' + @url)
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    
    @condensed = res.body.scan(/(title\?title=)(.*?)(">imdb<\/a>)/)
    @html = res.body
    @text = @condensed.join(",")
    @text.sub!("title?title=,","{")
    @text.gsub!(",\">imdb</a>,title?title=,","},{")
    @text.gsub!(",\">imdb</a>","}")

    
    
    if @text.upcase.include? @title.upcase 
      @result = "yes"
    else
      @result = "no"
    end

  end
  def gljson

    if params.has_key?(:title)
      @title = params[:title]  
    else
      @title = ""
    end
    
    require 'net/http'

    url = URI.parse('http://netflixroulette.net/api/api.php?title='+@title)
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }

    @html = res.body

    @noRes = "We couldn't find a movie with that title!"
    if @html.upcase.include? @noRes.upcase
     @result = "no"
    else
      @result = "yes"
    end

  end
  
end
