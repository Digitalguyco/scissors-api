from flask_restx import Namespace, Resource, fields, marshal_with
from flask import redirect, request, json, jsonify, current_app, make_response
from flask_limiter import Limiter
from ..models.shorturl import Shorturl
from ..utils import db
from ..models.analytics import Analytic

url_redirect_namespace = Namespace('', description='name space for url redirect')

@url_redirect_namespace.route('/<string:short_url>')
class UrlRedirect(Resource): 
  @url_redirect_namespace.doc(
      description='Url Redirect',
      params = {'short_url': 'A Short URL'}
  )
  #@jwt_required() 
#   @cache.cached(timeout=60)
  def get(self, short_url):

    """
      Redirect A Shortened Url to A Long Url
    """
    shorturl = Shorturl.query.filter_by(short_url=short_url).first()
    print(shorturl)

    if shorturl:
        long_url = shorturl.long_url

        shorturl.click_count += 1
        db.session.commit()

        tracking_data = Analytic(
            short_url_id=shorturl.id,
            ip_address=request.remote_addr,
            user_agent=request.user_agent.string
        )
        tracking_data.save()
        db.session.commit()

        response = make_response(redirect(long_url))
        response.status_code = 302
        return response

    response = make_response(jsonify({"message": "Url not found"}))
    response.status_code = 404
    return response