from flask_restx import Namespace, Resource, fields
from flask import send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
from ..models.analytics import Analytic
from ..models.shorturl import Shorturl
from ..config.config import cache
from ..utils import db
from datetime import datetime
from http import HTTPStatus
from flask_jwt_extended import get_jwt_identity

analytics_namespace = Namespace('analytics', description='name space for url analytics')

analytics_model = analytics_namespace.model(
    'Analytic', {
        'id': fields.Integer(),
        'short_url_id': fields.Integer(),
        'click_timestamp': fields.DateTime(description='The time a shortened URL was clicked'),
        'ip_address': fields.String(description='IP address'),
        'user_agent': fields.String(description='User agent')
    }
)

@analytics_namespace.route('/<string:short_url>')
class UrlAnalytics(Resource):
    @analytics_namespace.doc(
            description='Get URL Analytics',
            params = {'short_url': 'A Short URL'}
    )
    @cache.cached(timeout=60)
    @jwt_required()
    def get(self, short_url):
        """
        Get Analytics for the Current User's Shortened URLs
        """
        
        current_user = User.query.filter_by(firstname=get_jwt_identity()).first()


        shorturl = Shorturl.query.filter_by(short_url=short_url).first()

        if not shorturl:
            return {'message': 'URL not found'}, HTTPStatus.NOT_FOUND
        
        if shorturl.user_id != current_user.id:
            return {'message': 'URL not found'}, HTTPStatus.NOT_FOUND

        analytics = Analytic.query.filter_by(id=shorturl.id).all()

        analytics_data = []
        for entry in analytics:
            data = {
                'id': entry.id,
                'click_count': shorturl.click_count,
                'click_timestamp': entry.click_timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                'ip_address': entry.ip_address,
                'user_agent': entry.user_agent
            }
            analytics_data.append(data)

        print(analytics)
        
        if len(analytics_data )>= 1:
        
                
            return {'analytics_data':analytics_data},200
        else:
            return ({"message":'an error occured!'},501)