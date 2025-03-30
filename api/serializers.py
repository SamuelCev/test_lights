from rest_framework import serializers

class PriceCalculatorSerializer(serializers.Serializer):
    #ADD-ONS
    championQuantity = serializers.IntegerField(min_value=0, required=True)
    streamingEnabled = serializers.BooleanField(required=True)
    isSoloOnly = serializers.BooleanField(required=True)
    isExpress = serializers.BooleanField(required=True)
    isDuoService = serializers.BooleanField(required=True)
    voiceEnabled = serializers.BooleanField(required=True)

    #Service data
    currentRank = serializers.IntegerField(default = None, required=False, allow_null = True)
    desiredRank = serializers.IntegerField(default = None, required=False, allow_null = True)
    currentLp = serializers.IntegerField(default = None, required=False, allow_null = True)
    amountGames = serializers.IntegerField(default = None, required=False, allow_null = True)
    serviceType = serializers.IntegerField(required=True)
    region = serializers.IntegerField(required=True)