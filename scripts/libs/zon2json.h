#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <regex.h>

#include <stdio.h>
#include <string.h>
#include <regex.h>


// https://stackoverflow.com/questions/8044081/how-to-do-regex-string-replacements-in-pure-c
// Function to replace a pattern in the input string with a formatted replacement
void replace(char *input, const char *pattern, const char *replacement_format) {
    regex_t regex;           // Regular expression object
    regmatch_t match[2];     // Array to hold matches (full match and one capture group)
    char buffer[1024];       // Temporary buffer for formatted replacement
    char result[1024] = "";  // Buffer to store the final result
    int start = 0;           // Start index for searching the input

    // Compile the regular expression pattern
    regcomp(&regex, pattern, REG_EXTENDED);

    // Loop through all matches in the input string
    while (regexec(&regex, input + start, 2, match, 0) == 0) {
        // Append the portion of input before the match to the result
        strncat(result, input + start, match[0].rm_so);

        // Format the replacement using the captured group
        snprintf(buffer, sizeof(buffer), replacement_format, 
                 strndup(input + start + match[1].rm_so, match[1].rm_eo - match[1].rm_so));
        strcat(result, buffer); // Append the formatted replacement to the result

        // Move the start index past the current match
        start += match[0].rm_eo;
    }

    // Append any remaining part of the input string to the result
    strcat(result, input + start);

    // Copy the final result back to the input string
    strcpy(input, result);

    // Free the compiled regular expression
    regfree(&regex);
}


void zon2json(char *input) {
    // Replace .{ with {
    replace(input, "\\.\\{", "{");

    // Replace .field = "value" with "field": "value"
    replace(input, "\\.([a-zA-Z0-9_-]+)\\s*=\\s*", "\"%s\": ");

    // Handle the @"lib-zig" case
    replace(input, "\\.\\@\"([a-zA-Z0-9_-]+)\"", "\"%s\": \"\"");

    // Remove extra dots before opening braces
    replace(input, "\\s*\\.\\{", "{");

    // Remove commas after the last element in objects (JSON doesn't allow trailing commas)
    replace(input, ",(\\s*\\})", "\\1");

    // Print the result to stdout
    return;
}
