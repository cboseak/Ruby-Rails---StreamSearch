class SearchController < ApplicationController 
  
  def index
    render layout: "blank"
  end
  
  def search
    render layout: "triangle"
  end
    
  def gl
    #render layout: "blank"
    if params.has_key?(:url)
      @url = params[:url]  
    else
      @url = "usa.netflixable.com/2016/01/complete-alphabetical-list-sat-jan-23.html"
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
    require "json"
    if params.has_key?(:url)
      @url = params[:url]  
    else
      @url = "usa.netflixable.com/2016/01/complete-alphabetical-list-sat-jan-23.html"
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
    @text = @condensed.join(";")
    @text.sub!("title?title=;","")
    @text.gsub!(";\">imdb</a>;title?title=;",";")
    @text.gsub!(";\">imdb</a>","")
    @titles = @text.split(";")

    if @text.upcase.include? @title.upcase 
     @result = "yes"
    else
      @result = "no"
    end

  end
  
end
