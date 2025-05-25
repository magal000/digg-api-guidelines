#!/bin/bash
# jq (https://github.com/jqlang/jq) and spectral (https://github.com/stoplightio/spectral)
# needs, perhaps obvious, to be installed

INPUT_FILE="testDefintions.json"
PASSED=0
FAILED=0
SKIPPED=0

while read -r testCase; do

  TEST_NAME=$(echo "$testCase" | jq -r '.testName')
  FILE_NAME=$(echo "$testCase" | jq -r '.testFile')
  DISABLED=$(echo "$testCase" | jq -r '.disabled')
  EXPECTED_ERROR_CODES=($(echo "$testCase" | jq -r '.expectedErrorCodes[]'))
  NR_OF_EXPECTED_ERROR_CODES=$(echo "$testCase" | jq '.expectedErrorCodes | length')

  if [[ "$DISABLED" == "true" ]]; then
    echo "⚠️ Disabled test: $TEST_NAME"
    ((SKIPPED++))
    continue
  fi

  if [[ ! -f "$FILE_NAME" ]]; then
    echo "❌ $FILE_NAME not found"
    ((FAILED++))
    continue
  fi


  OUTPUT=$(spectral lint "$FILE_NAME" --format json --fail-severity hint)
  STATUS=$?

  if [[ $STATUS -ne 0 ]]; then 
    readarray -t ACTUAL_ERROR_CODES < <(echo "$OUTPUT" | jq -r '.[].code')
    SORTED_EXPECTED_EC=($(printf '%s\n' "${EXPECTED_ERROR_CODES[@]}" | sort))
    SORTED_ACUTAL_EC=($(printf '%s\n' "${ACTUAL_ERROR_CODES[@]}" | sort))
  fi

  if [[ $STATUS -eq 0 && $NR_OF_EXPECTED_ERROR_CODES -eq 0 ]]; then
    echo "✅ $TEST_NAME passed"
    ((PASSED++))
    continue
  elif [[ $STATUS -ne 0 && "${SORTED_EXPECTED_EC[*]}" == "${SORTED_ACUTAL_EC[*]}" ]]; then
    echo "✅ $TEST_NAME passed"
    ((PASSED++))
    continue
  else
    echo "❌ $TEST_NAME failed"
    echo "   Expected: [${EXPECTED_ERROR_CODES[@]}]"
    echo "   Actual:   [${ACTUAL_ERROR_CODES[@]}]"
    ((FAILED++))
  fi


done < <(jq -c '.[]' "$INPUT_FILE")

echo ""
echo "Test summary: ✅ $PASSED passed, ❌ $FAILED failed, ⚠️ $SKIPPED skipped"

# 256 failed test cases would overflow back to 0 -> successful exit?
exit $FAILED
