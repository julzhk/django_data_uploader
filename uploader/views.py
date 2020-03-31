import datetime
import io
from collections import Counter

from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie

from uploader.models import RawData

TRADE_TYPES_CODES = {'S': 'Clear',
     'A': 'Add',
     'E': 'Executed',
     'X': 'Cancel',
     'P': 'Trade',
     'B': 'Break',
     'H': 'Status',
     'I': 'Auction-Update',
     'J': 'Auction-Summary'}

TYPE_COLUMN_NO = 9


def home(request):
    return render(request, 'uploader/home.html', {})


@ensure_csrf_cookie
def api(request):
    if request.FILES:
        file_readlines, filename = extract_file_data(request)
        types_list = store_trades(file_readlines, filename)
        breakdown: dict = dict(Counter(types_list))
        labeled_breakdown = convert_type_codes_to_labels(breakdown)
        if labeled_breakdown:
            return JsonResponse(labeled_breakdown)
        else:
            return HttpResponseBadRequest('no good data supplied')
    return HttpResponseForbidden()


def extract_file_data(request):
    filebytecode = request.FILES['file'].file
    filename = request.FILES['file'].name
    io_file = io.TextIOWrapper(filebytecode)
    file_readlines = io_file.readlines()
    return file_readlines, filename


def store_trades(file_readlines, filename):
    uploaded_data_list = []
    types_list = []
    now = datetime.datetime.now()
    for line in file_readlines:
        if line[TYPE_COLUMN_NO] in TRADE_TYPES_CODES:
            uploaded_data_list.append(RawData(data=line, filename=filename, timestamp=now))
            types_list.append(line[TYPE_COLUMN_NO])
    RawData.objects.bulk_create(uploaded_data_list)
    return types_list


def convert_type_codes_to_labels(breakdown):
    labeled_breakdown = {}
    for old_key in TRADE_TYPES_CODES:
        if old_key in breakdown:
            labeled_breakdown[TRADE_TYPES_CODES[old_key]] = breakdown[old_key]
    return labeled_breakdown
