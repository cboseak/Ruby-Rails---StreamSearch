class SearchController < ApplicationController
  helper_method :getSignatureKey, :generateMovieSearchUrl
  
  def index
    
  end
  def getSignatureKey (key, dateStamp, regionName, serviceName)
    kDate    = OpenSSL::HMAC.digest('sha256', "AWS4" + key, dateStamp)
    kRegion  = OpenSSL::HMAC.digest('sha256', kDate, regionName)
    kService = OpenSSL::HMAC.digest('sha256', kRegion, serviceName)
    kSigning = OpenSSL::HMAC.digest('sha256', kService, "aws4_request")

    kSigning
  end    
  def generateMovieSearchUrl()
    base        =   "\"http://api-public.guidebox.com/v1.43/US/rKiM2zR4cTaMZM3VLtkqjaG7NmQssvh7/search/movie/title/\""

    base
  end
end
