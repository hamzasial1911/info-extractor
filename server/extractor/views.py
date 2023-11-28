# views.py
import json
import re

from django.http import HttpResponseBadRequest, JsonResponse


def extract_data(request):
    """
    Extract specific information from a given text using regular expressions.

    This view expects a POST request containing a JSON payload with a "text" field.
    It uses regular expressions to extract start and end dates, as well as minimum and maximum contribution amounts
    from the provided text.

    Args:
        request (HttpRequest): The HTTP request object containing the JSON payload with a "text" field.

    Returns:
        JsonResponse: A JSON response containing the extracted data, or an error message if extraction fails.

    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get("text")
            if text is None:
                raise ValueError("Text data not provided")

            # Extract the contribution or offering period start and end dates using regex
            start_date_match = re.search(
                r"(?:commence|begin|start).*?(?:on|as of)?\s*([A-Z][a-z]+(?:\s+\d{1,2}(?:,\s*\d{4})?)?)",
                text,
            )
            end_date_match = re.search(
                r"(?:end).*?(?:on|as of|end)?\s*([A-Z][a-z]+\s+\d{1,2}(?:,\s*\d{4})?)",
                text,
            )

            if start_date_match and end_date_match:
                start_date = start_date_match.group(1)
                end_date = end_date_match.group(1)
            else:
                start_date = None
                end_date = None

            # Extract the minimum and maximum contribution amounts using regex
            min_contribution_match = re.search(
                r"(?:not less than|minimum|at least)\s*(\d+(?:\.\d+)?)\%", text
            )
            max_contribution_match = re.search(
                r"(?:not more than|maximum|up to)\s*(\d+(?:\.\d+)?)\%", text
            )

            if min_contribution_match and max_contribution_match:
                min_contribution = float(min_contribution_match.group(1))
                max_contribution = float(max_contribution_match.group(1))
            else:
                min_contribution = None
                max_contribution = None

            # Return a JSON response with the extracted data
            response_data = {
                "start_date": start_date,
                "end_date": end_date,
                "min_contribution": min_contribution,
                "max_contribution": max_contribution,
            }

            return JsonResponse(response_data)
        except Exception as e:
            # Handle exceptions (e.g., invalid input or extraction errors)
            error_message = str(e)
            return JsonResponse({"error": error_message}, status=400)
    else:
        return HttpResponseBadRequest("Invalid request method")
