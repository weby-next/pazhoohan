from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from ..serializers.notificationRecipientSerializer import NotificationRecipientSerializer
from core.apiResponse.apiResponse import ApiResponse
from ..models import NotificationRecipient
from core.permissions.IsReceiverNotification import IsReceiverNotification
import jdatetime


class NotificationRecipientViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):

    permission_classes = [IsAuthenticated]
    serializer_class = NotificationRecipientSerializer

    def get_queryset(self):
        queryset = NotificationRecipient.objects.filter(
            receiver=self.request.user
        )

        params = self.request.query_params.get("is_seen")
        if params is not None:
            queryset = queryset.filter(is_seen=params.lower() == "true")

        return queryset

    def update(self, request, *args, **kwargs):
        obj = self.get_object()

        serializer = self.get_serializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        serializer.save(
            is_seen=True,
            seen_at=jdatetime.datetime.now()
        )

        return ApiResponse.success(
            message="با موفقیت نوتیف سین شد",
            data=serializer.data
        )
    
    def list(self, request, *args, **kwargs):
        qs = self.get_queryset()

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return ApiResponse.success(
                message="نوتیف های شما با موفقیت گرفته شد",
                data=serializer.data
            )
        
        serializer = self.get_serializer(qs, many=True)
        return ApiResponse.success(
                message="نوتیف های شما با موفقیت گرفته شد",
                data=serializer.data
        )

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()

        serializer = self.get_serializer(obj)

        return ApiResponse.success(
            message="نوتیف شما با موفقیت گرفته شد",
            data=serializer.data
        )